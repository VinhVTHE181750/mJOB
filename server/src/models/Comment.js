const { Model, DataTypes } = require("sequelize");
const sequelize = require("./SQLize");
const CommentLike = require("./CommentLike");

class Comment extends Model {}

Comment.init(
  {
    content: DataTypes.STRING,
  },
  {
    sequelize,
  }
);

Comment.hasMany(CommentLike);
CommentLike.belongsTo(Comment);

module.exports = Comment;
