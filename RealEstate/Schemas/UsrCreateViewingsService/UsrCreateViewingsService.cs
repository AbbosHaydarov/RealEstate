using System;
using Terrasoft.Core;

namespace RealEstate;

#region Class: UsrCreateViewingsService

public class UsrCreateViewingsService
{
	#region Constants: Private

	private static readonly string[] FirstNames = {
		"John", "Maria", "Robert", "Emily", "Michael",
		"Alice", "Bob", "Carol", "David", "Eva",
		"Frank", "Grace", "Henry", "Iris", "James",
		"Karen", "Leo", "Mona", "Nathan", "Olivia"
	};

	private static readonly string[] LastNames = {
		"Smith", "Johnson", "Brown", "Davis", "Wilson",
		"Cooper", "Martin", "White", "Lee", "Garcia",
		"Taylor", "Anderson", "Thomas", "Jackson", "Harris",
		"Clark", "Lewis", "Walker", "Hall", "Young"
	};

	private static readonly string[] CommentTemplates = {
		"Scheduled viewing for potential buyer",
		"Client requested morning viewing",
		"Follow-up viewing after initial interest",
		"Group viewing session",
		"Private viewing arranged",
		"Virtual tour requested before in-person visit",
		"Client arriving from out of town",
		"Second viewing to confirm purchase decision",
		"Investor viewing multiple properties",
		"Viewing with family members present"
	};

	#endregion

	#region Methods: Public

	/// <summary>
	/// Creates a number of <c>UsrRealEstateViewings</c> records equal to the
	/// <c>ViewingsCount</c> system setting value, linked to the specified Real Estate object.
	/// Viewing date-times start at UtcNow + 1 day and increment by 1 day per record.
	/// Owner, client, and comment values are generated randomly for each record.
	/// </summary>
	/// <param name="userConnection"></param>
	/// <param name="recordId">Id of the UsrRealEstate record.</param>
	public void CreateViewings(UserConnection userConnection, Guid recordId)
	{
		var viewingsCount = Terrasoft.Core.Configuration.SysSettings
			.GetValue(userConnection, "ViewingsCount", 0);
		// Resolve the UsrRealEstateViewings entity schema once and reuse it.
		var schema = userConnection.EntitySchemaManager
			.GetInstanceByName("UsrRealEstateViewings");

		// Base time for date calculation — all offsets are relative to this moment.
		DateTime baseDate = DateTime.UtcNow;
		var rng = new Random();

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

			// Randomly combine first and last names for owner and client.
			string ownerName = FirstNames[rng.Next(FirstNames.Length)] + " "
				+ LastNames[rng.Next(LastNames.Length)];
			string clientName = FirstNames[rng.Next(FirstNames.Length)] + " "
				+ LastNames[rng.Next(LastNames.Length)];

			entity.SetColumnValue("UsrOwner", ownerName);
			entity.SetColumnValue("UsrPotentialClient", clientName);
			entity.SetColumnValue("UsrComment", CommentTemplates[rng.Next(CommentTemplates.Length)]);

			entity.Save();
		}
	}

	#endregion
}

#endregion