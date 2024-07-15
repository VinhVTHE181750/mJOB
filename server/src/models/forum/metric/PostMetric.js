const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class PostMetric extends Model {}

PostMetric.init(
  {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Posts",
        key: "id",
      },
    },
    day: {
      type: DataTypes.DATEONLY,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    comments: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = PostMetric;
