const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class JobHistory extends Model {}

// This object stores the job history of users
// One user may have multiple jobs in the past
JobHistory.init(
  {
    // PK = FK: JobId
    // PK = FK: UserId
    action: {
      type: DataTypes.ENUM(
        "APPLY", // for applicants
        "ACCEPT", // for employers
        "REJECT", // for employers
        "CANCEL", // for applicants
        "START", // when ACTIVE -> ONGOING
        "COMPLETE", // when ONGOING -> COMPLETED
        "CREATE", // for employers
        "UPDATE", // for employers
        "DELETE", // for employers, mod, admin
        "DELIST", // for mod, admin
        "PUBLISH" // for employers, when INACTIVE -> ACTIVE
      ),
      allowNull: false,
    },
    // Job info can also be stored here
  },
  {
    sequelize,
    updatedAt: false,
  }
);

module.exports = JobHistory;
