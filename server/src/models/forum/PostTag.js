const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class PostTag extends Model {}

PostTag.init(
    {
        name: DataTypes.STRING,
    }, {
        sequelize,
    }
)

module.exports = PostTag;