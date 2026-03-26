using System;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Web.Common;

namespace RealEstate
{
	#region Class: GetTotalPriceRequest

	/// <summary>
	/// Request body for the GetTotalPrice web service endpoint.
	/// Both fields are required; if either is missing the service returns -1.
	/// </summary>
	[DataContract]
	public class GetTotalPriceRequest
	{
		/// <summary>
		/// Id of the real estate type (UsrType lookup value).
		/// </summary>
		[DataMember(Name = "typeId")]
		public string TypeId { get; set; }

		/// <summary>
		/// Id of the offer type (UsrOfferType lookup value), e.g. Sale or Rental.
		/// </summary>
		[DataMember(Name = "offerTypeId")]
		public string OfferTypeId { get; set; }
	}

	#endregion

	#region Class: GetTotalPriceResponse

	/// <summary>
	/// Response returned by the GetTotalPrice endpoint.
	/// </summary>
	[DataContract]
	public class GetTotalPriceResponse
	{
		/// <summary>
		/// Sum of prices of all matching real estate records,
		/// or -1 if required arguments were not provided.
		/// </summary>
		[DataMember(Name = "totalPrice")]
		public decimal TotalPrice { get; set; }

		/// <summary>
		/// Human-readable message describing the result.
		/// </summary>
		[DataMember(Name = "message")]
		public string Message { get; set; }
	}

	#endregion

	#region Class: UsrGetTotalPriceService

	/// <summary>
	/// Web service that calculates the total price of real estate objects
	/// filtered by type and offer type.
	///
	/// Endpoint : POST /0/rest/UsrGetTotalPriceService/GetTotalPrice
	/// Auth     : Required (non-anonymous) — inherits from BaseService which
	///            uses the Creatio session / basic auth cookie.
	/// </summary>
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class UsrGetTotalPriceService : BaseService
	{
		#region Methods: Public

		/// <summary>
		/// Calculates the sum of <c>UsrPrice</c> values for all <c>UsrRealEstate</c>
		/// records that match both <paramref name="request.TypeId"/> and
		/// <paramref name="request.OfferTypeId"/>.
		/// </summary>
		/// <param name="request">
		/// JSON body containing <c>typeId</c> and <c>offerTypeId</c>.
		/// </param>
		/// <returns>
		/// <see cref="GetTotalPriceResponse"/> with <c>totalPrice</c> equal to the
		/// calculated sum, or <c>-1</c> if any required argument is absent.
		/// </returns>
		[OperationContract]
		[WebInvoke(
			Method = "POST",
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json,
			BodyStyle = WebMessageBodyStyle.Bare,
			UriTemplate = "GetTotalPrice")]
		public GetTotalPriceResponse GetTotalPrice(GetTotalPriceRequest request)
		{
			// 401 — reject unauthenticated callers explicitly.
			// BaseService sets UserConnection to null when there is no valid session.
			if (UserConnection == null)
			{
				return new GetTotalPriceResponse
				{
					TotalPrice = -1,
					Message = "Authentication is required."
				};
			}

			// 400 — return -1 when the body or any required field is missing.
			if (request == null
				|| string.IsNullOrWhiteSpace(request.TypeId)
				|| string.IsNullOrWhiteSpace(request.OfferTypeId))
			{
				return new GetTotalPriceResponse
				{
					TotalPrice = -1,
					Message = "Both 'typeId' and 'offerTypeId' are required."
				};
			}

			// 400 — validate GUID format before querying the database.
			if (!Guid.TryParse(request.TypeId, out Guid typeId)
				|| !Guid.TryParse(request.OfferTypeId, out Guid offerTypeId))
			{
				return new GetTotalPriceResponse
				{
					TotalPrice = -1,
					Message = "Both 'typeId' and 'offerTypeId' must be valid GUIDs."
				};
			}

			// UserConnection is provided by BaseService and represents the
			// authenticated caller — no anonymous access is possible here.
			UserConnection userConnection = UserConnection;

			// Build an Entity Schema Query against UsrRealEstate.
			var esq = new EntitySchemaQuery(
				userConnection.EntitySchemaManager, "UsrRealEstate");

			// Add the price column so we can read its value per row.
			esq.AddColumn("UsrPrice");

			// Filter by UsrType (real estate category: apartment, house, etc.)
			esq.Filters.Add(esq.CreateFilterWithParameters(
				FilterComparisonType.Equal,
				"UsrType",
				typeId));

			// Filter by UsrOfferType (sale or rental).
			esq.Filters.Add(esq.CreateFilterWithParameters(
				FilterComparisonType.Equal,
				"UsrOfferType",
				offerTypeId));

			// Execute the query and iterate over the result set.
			EntityCollection entities = esq.GetEntityCollection(userConnection);

			decimal totalPrice = 0m;
			foreach (Entity entity in entities)
			{
				totalPrice += entity.GetTypedColumnValue<decimal>("UsrPrice");
			}

			return new GetTotalPriceResponse
			{
				TotalPrice = totalPrice,
				Message = $"Total price calculated for {entities.Count} record(s)."
			};
		}

		#endregion
	}

	#endregion
}