const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class PostCategory extends Model {}

PostCategory.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);



module.exports = PostCategory;
