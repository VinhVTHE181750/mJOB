const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../SQLize");
const PostCategory = require("./PostCategory");
const PostTag = require("./PostTag");

class PostHistory extends Model {}

PostHistory.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

PostCategory.hasMany(PostHistory);
PostHistory.belongsTo(PostCategory);

module.exports = PostHistory;
