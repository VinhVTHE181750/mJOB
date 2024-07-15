const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Application extends Model {}

// This object stores the application information for each (active applicant - job)
Application.init(
  {
    // FK: JobId
    // FK: UserId
    // Status: PENDING, ACCEPTED, REJECTED
    status: {
      type: DataTypes.ENUM(
        "PENDING", // apply -> waiting
        "ACCEPTED", // waiting -> accepted
        "REJECTED", // waiting -> rejected
        "ONGOING", // accepted -> ongoing
        "COMPLETED" // ongoing -> completed
      ),
      allowNull: false,
    },
    // Date of application
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
  }
);


module.exports = Application;