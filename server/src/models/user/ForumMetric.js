const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class ForumMetric extends Model {}

ForumMetric.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
      defaultValue: new Date().toISOString().split("T")[0],
    },
    postCreated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    commentCreated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    postDeleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    commentDeleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    postUpdated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    commentUpdated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    postLiked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    commentLiked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    postDisliked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    commentDisliked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    postReported: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    commentReported: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = ForumMetric;
// Compare this snippet from server/src/models/forum/Post.js:
