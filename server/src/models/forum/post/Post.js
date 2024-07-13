const Comment = require("../comment/Comment");
const PostLike = require("./PostLike");
const { sequelize } = require("../../SQLize");
const { Model, DataTypes } = require("sequelize");
const PostCategory = require("./PostCategory");
const Tag = require("./Tag");
const PostMetric = require("../metric/PostMetric");
const PostHistory = require("./PostHistory");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PUBLISHED", "DRAFT", "DELISTED"),
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
    getterMethods: {
      /**
       * @return {string[]} Array of tags
       *
       * */
      _tags() {
        if (this.getDataValue("tags") === null) return null;
        return this.getDataValue("tags").split(",");
      },
    },
  }
);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasMany(PostLike);
PostLike.belongsTo(Post);

Post.hasMany(PostMetric);
PostMetric.belongsTo(Post);

Post.hasMany(PostHistory);
PostHistory.belongsTo(Post);

Post.belongsTo(PostCategory);
PostCategory.hasMany(Post);

Post.belongsToMany(Tag, { through: "PostTags" });
Tag.belongsToMany(Post, { through: "PostTags" });

module.exports = Post;
