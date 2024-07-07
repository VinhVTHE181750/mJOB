const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../../SQLize");

class ForumMetric extends Model {
}

ForumMetric.init(
    {
        day: {
            type: DataTypes.DATEONLY,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        postCreated: DataTypes.INTEGER,
        postEdited: DataTypes.INTEGER,
        postDeleted: DataTypes.INTEGER,
        postLiked: DataTypes.INTEGER,
        postDisliked: DataTypes.INTEGER,
        postReported: DataTypes.INTEGER,
        postViewed: DataTypes.INTEGER,
        visitor: DataTypes.TEXT,
        commentCreated: DataTypes.INTEGER,
        commentEdited: DataTypes.INTEGER,
        commentDeleted: DataTypes.INTEGER,
        commentLiked: DataTypes.INTEGER,
        commentDisliked: DataTypes.INTEGER,
        commentReported: DataTypes.INTEGER,
        tagSearched: DataTypes.TEXT,
        tagCreated: DataTypes.TEXT,
    },
    {
        sequelize,
        timestamps: false,
    }
)

module.exports = ForumMetric;