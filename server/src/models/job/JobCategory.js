const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");
const Job = require("./Job"); // Ensure this import is correct

class JobCategory extends Model {}

JobCategory.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'JobCategory'
  }
);

module.exports = JobCategory;
