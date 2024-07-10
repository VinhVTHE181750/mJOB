const Auth = require("./Auth");
const Comment = require("./Comment");
const CommentLike = require("./CommentLike");
const Post = require("./Post");
const PostLike = require("./PostLike");
const sequelize = require("./SQLize");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
      },
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

User.hasOne(Auth);
Auth.belongsTo(User)

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(PostLike);
PostLike.hasMany(User);

User.hasMany(CommentLike);
CommentLike.hasMany(User);

module.exports = User;
