const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

const Job = require("./Job");
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
    paranoid: true,
  }
);

JobCategory.hasMany(Job, {
  as: "CategoryID"});

module.exports = JobCategory;
