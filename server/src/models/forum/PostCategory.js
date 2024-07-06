const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class PostCategory extends Model {}

PostCategory.init(
    {
        name: DataTypes.STRING,
    }, {
        sequelize,
    }
)

module.exports = PostCategory;