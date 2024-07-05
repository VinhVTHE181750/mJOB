const { Model, DataTypes } = require("sequelize");
const sequelize = require("./SQLize"); // adjust this path to your sequelize instance

class PostLike extends Model {}

PostLike.init(
  {
    like: DataTypes.BOOLEAN,
  },
  {
    sequelize,
  }
);

module.exports = PostLike;
