const { sequelize } = require("../../SQLize");
const {Model, DataTypes} = require("sequelize");

class PublicChatMetric extends Model {}

PublicChatMetric.init(
    {
        RoomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "PublicChatRooms",
                key: "id",
            },
        },
        day: {
            type: DataTypes.DATEONLY,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        messages: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize
    }
);

module.exports = PublicChatMetric;