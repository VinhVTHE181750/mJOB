const { sequelize } = require("../SQLize");
const { Model, DataTypes } = require("sequelize");
const RequirementStorage = require("./RequirementStorage");

class Requirement extends Model {}

Requirement.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("TEXT", "FILE"),
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

Requirement.hasMany(RequirementStorage);
RequirementStorage.belongsTo(Requirement);

module.exports = Requirement;
