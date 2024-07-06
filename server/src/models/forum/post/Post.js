const Comment = require("../comment/Comment");
const PostLike = require("./PostLike");
const { sequelize } = require("../../SQLize");
const { Model, DataTypes } = require("sequelize");
const PostCategory = require("../PostCategory");
const PostTag = require("../PostTag");
const PostMetric = require("../metric/PostMetric");

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    sequelize,
  }
);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasMany(PostLike);
PostLike.belongsTo(Post);

Post.hasOne(PostCategory);
PostCategory.belongsTo(Post);

Post.hasMany(PostTag);
PostTag.belongsTo(Post);

Post.hasMany(PostMetric);
PostMetric.belongsTo(Post);

Post.sync();

module.exports = Post;
