const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../SQLize");

class CommentMetric extends Model {}

CommentMetric.init(
    {
        CommentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Comments",
                key: "id",
            },
        },
        day: {
            type: DataTypes.DATEONLY,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        likes: DataTypes.INTEGER,
        dislikes: DataTypes.INTEGER,
        updates: DataTypes.INTEGER,
        deletes: DataTypes.INTEGER,
        creates: DataTypes.INTEGER,
        reports: DataTypes.INTEGER,
    }, {
        sequelize,
        timestamps: false,
    }




)

module.exports = CommentMetric;