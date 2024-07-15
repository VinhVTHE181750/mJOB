const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class JobHistory extends Model {}

// This object stores the job history of users
// One user may have multiple jobs in the past
JobHistory.init(
  {
    // JobId
    // UserId
    // status: false = ongoing OR true = completed
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,        
    }
    // endDate
  },
  {
    sequelize,
  }
);

module.exports = JobHistory;
