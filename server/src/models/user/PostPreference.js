const { sequelize } = require("../SQLize");

const { Model, DataTypes } = require("sequelize");

class PostPreference extends Model {}

PostPreference.init(
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
    tags: {
      // it,remote,software,...
      type: DataTypes.STRING,
      allowNull: true,
    },
    categories: {
      // General,Job,Guide,...
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

module.exports = PostPreference;
