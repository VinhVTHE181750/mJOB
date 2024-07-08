const { sequelize } = require("../../SQLize");
const {Model, DataTypes} = require("sequelize");


class PublicChatMessage extends Model {}

PublicChatMessage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // The message content
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        updatedAt: false, // Disable edit message
        paranoid: true, // To display "Message deleted" instead of removing the message
    }
);

module.exports = PublicChatMessage;