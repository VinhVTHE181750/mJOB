const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");
class PostMetric extends Model {}

PostMetric.init(
    {
        
        day: DataTypes.DATEONLY,
        likes: DataTypes.INTEGER,
        dislikes: DataTypes.INTEGER,
        comments: DataTypes.INTEGER,
        views: DataTypes.INTEGER,
    }, {
        sequelize,
        timestamps: false,
    }
)

module.exports = PostMetric;