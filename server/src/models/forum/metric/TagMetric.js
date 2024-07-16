const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class TagMetric extends Model {}

TagMetric.init(
  {
    day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    searches: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    setterMethods: {
      _incrementUsage() {
        this.usage++;
      },
      _decrementUsage() {
        this.usage--;
      },
    },
    updatedAt: false,
  }
);

module.exports = TagMetric;
