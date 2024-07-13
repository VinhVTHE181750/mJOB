const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../../SQLize");
const PostCategory = require("./PostCategory");
const PostTag = require("./PostTag");

class PostHistory extends Model {
}

PostHistory.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        action: {
            type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE", "DRAFT", "DELIST", "PUBLISH"),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("DRAFT", "PUBLISHED", "DELISTED"),
            allowNull: false,
        },
        PostCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "PostCategories",
                key: "id",
            },
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        PostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Posts",
                key: "id",
            },
        },

    },
    {
        sequelize,
        updatedAt: false,
    }
);

module.exports = PostHistory;
