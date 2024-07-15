const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class RequirementStorage extends Model {}

// This object stores the submission of applicants for each requirement

RequirementStorage.init(
  {
    // FK: RequirementId
    // FK: UserId
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = RequirementStorage;
