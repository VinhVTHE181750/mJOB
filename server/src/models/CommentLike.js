const { Model, DataTypes } = require("sequelize");
const sequelize = require("./SQLize"); // adjust this path to your sequelize instance
const Comment = require("./Comment"); // adjust this path to your Comment model
const Post = require("./Post");

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
