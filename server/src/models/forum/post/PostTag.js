const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class PostTag extends Model {}

PostTag.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    updatedAt: false,
  }
);

module.exports = PostTag;
