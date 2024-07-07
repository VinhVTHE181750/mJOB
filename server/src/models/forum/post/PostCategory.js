const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");
const CategoryMetric = require("../metric/CategoryMetric");

class PostCategory extends Model {}

PostCategory.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    updatedAt: false,
  }
);

PostCategory.hasMany(CategoryMetric);
CategoryMetric.belongsTo(PostCategory);


module.exports = PostCategory;
