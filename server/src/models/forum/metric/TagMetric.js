const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class TagMetric extends Model {}

TagMetric.init(
  {
    day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      primaryKey: true,
    },
    PostTagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "PostTags",
        key: "id",
      },
    },
    searches: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: { 
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    uses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    updatedAt: false,
  }
);

module.exports = TagMetric;
