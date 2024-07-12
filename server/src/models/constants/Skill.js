const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Skill extends Model {}

Skill.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Skill;
