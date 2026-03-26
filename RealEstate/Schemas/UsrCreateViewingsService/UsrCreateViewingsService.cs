using System;
using Terrasoft.Core;

namespace RealEstate;

#region Class: UsrCreateViewingsService

public class UsrCreateViewingsService
{
	#region Constants: Private

	// Sample owner names used in rotation for the 5 records.
	private static readonly string[] OwnerNames = {
		"John Smith",
		"Maria Johnson",
		"Robert Brown",
		"Emily Davis",
		"Michael Wilson"
	};

	// Sample potential client names used in rotation for the 5 records.
	private static readonly string[] ClientNames = {
		"Alice Cooper",
		"Bob Martin",
		"Carol White",
		"David Lee",
		"Eva Garcia"
	};

	// Sample comments used in rotation for the 5 records.
	private static readonly string[] Comments = {
		"Scheduled viewing for potential buyer",
		"Client requested morning viewing",
		"Follow-up viewing after initial interest",
		"Group viewing session",
		"Private viewing arranged"
	};

	#endregion

	#region Methods: Public

	/// <summary>
	/// Creates input count from SysSettings <c>UsrRealEstateViewings</c> records linked to the specified
	/// Real Estate object. Viewing date-times start at UtcNow + 1 day and
	/// increment by 1 day for each subsequent record.
	/// </summary>
	/// <param name="userConnection"></param>
	/// <param name="recordId">Id of the UsrRealEstate record.</param>
	public void CreateViewings(UserConnection userConnection,Guid recordId)
	{
		var viewingsCount = Terrasoft.Core.Configuration.SysSettings
			.GetValue(userConnection,"ViewingsCount", 0);
		// Resolve the UsrRealEstateViewings entity schema once and reuse it.
		var schema = userConnection.EntitySchemaManager
			.GetInstanceByName("UsrRealEstateViewings");

		// Base time for date calculation — all offsets are relative to this moment.
		DateTime baseDate = DateTime.UtcNow;

		for (int i = 1; i <= viewingsCount; i++)
		{
			// Create a new entity instance and populate default column values
			// (Id, CreatedOn, CreatedBy, etc.) automatically.
			var entity = schema.CreateEntity(userConnection);
			entity.SetDefColumnValues();

			// Link this viewing record to the parent Real Estate object.
			entity.SetColumnValue("UsrRealEstateId", recordId);

			// Date-time: first record = now + 1 day, each next = previous + 1 day.
			entity.SetColumnValue("UsrViewingDateTime", baseDate.AddDays(i));

			// Fill remaining fields with meaningful sample data.
			entity.SetColumnValue("UsrOwner", OwnerNames[i - 1]);
			entity.SetColumnValue("UsrPotentialClient", ClientNames[i - 1]);
			entity.SetColumnValue("UsrComment", Comments[i - 1]);

			entity.Save();
		}
	}

	#endregion
}

#endregion