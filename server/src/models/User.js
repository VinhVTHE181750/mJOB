const Auth = require("./Auth");
const Comment = require("./forum/comment/Comment");
const CommentLike = require("./forum/comment/CommentLike");
const Post = require("./forum/post/Post");
const PostLike = require("./forum/post/PostLike");
const { sequelize } = require("./SQLize");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isStudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
PostLike.belongsTo(User);

User.hasMany(CommentLike);
CommentLike.belongsTo(User);

module.exports = User;
