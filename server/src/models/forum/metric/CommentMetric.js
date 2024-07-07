const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class CommentMetric extends Model {}

CommentMetric.init(
    {
        day: DataTypes.DATEONLY,
        likes: DataTypes.INTEGER,
        dislikes: DataTypes.INTEGER,
    }, {
        sequelize,
        timestamps: false,
    }




)

module.exports = CommentMetric;