const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");
const TagMetric = require("../metric/TagMetric");

class Tag extends Model {}

Tag.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    updatedAt: false,
  }
);

Tag.hasMany(TagMetric);
TagMetric.belongsTo(Tag);

module.exports = Tag;
