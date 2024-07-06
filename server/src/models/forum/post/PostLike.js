const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class PostLike extends Model {}

PostLike.init(
  {
    isDislike: DataTypes.BOOLEAN,
  },
  {
    sequelize,
  }
);

module.exports = PostLike;
