const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class JobPreference extends Model {}

JobPreference.init(
  {
    fields: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = JobPreference;
