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
        postCreated: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        postEdited: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        postDeleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        postLiked: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        postDisliked: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        postReported: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        postViewed: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        visitor: {
            type: DataTypes.TEXT,
            defaultValue: 0,
        },
        commentCreated: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        commentEdited: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        commentDeleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        commentLiked: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        commentDisliked: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        commentReported: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        tagSearched: DataTypes.TEXT,
        tagCreated: DataTypes.TEXT,
    },
    {
        sequelize,
        timestamps: false,
    }
)

module.exports = ForumMetric;