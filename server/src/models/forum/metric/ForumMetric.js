const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class ForumMetric extends Model {}

ForumMetric.init(
    {
        day: DataTypes.DATEONLY,
        postCreated: DataTypes.INTEGER,
        commentCreated: DataTypes.INTEGER,
        postEdited: DataTypes.INTEGER,
        commentEdited: DataTypes.INTEGER,
        postDeleted: DataTypes.INTEGER,
        commentDeleted: DataTypes.INTEGER,
        postLiked: DataTypes.INTEGER,
        commentLiked: DataTypes.INTEGER,
        postDisliked: DataTypes.INTEGER,
        commentDisliked: DataTypes.INTEGER,
        postReported: DataTypes.INTEGER,
        commentReported: DataTypes.INTEGER,
        postViewed: DataTypes.INTEGER,
        visitor: DataTypes.TEXT,
        tagSearched: DataTypes.TEXT,
        tagCreated: DataTypes.TEXT,
    },
    {
        sequelize,
        timestamps: false,
    }
)

module.exports = ForumMetric;