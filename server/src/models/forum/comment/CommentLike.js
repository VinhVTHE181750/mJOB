const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class CommentLike extends Model {}

CommentLike.init(
  {
    like: DataTypes.BOOLEAN,
  },
  {
    sequelize,
  }
);

module.exports = CommentLike;
