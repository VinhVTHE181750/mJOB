const { sequelize } = require("../../SQLize");
const {Model, DataTypes} = require("sequelize");
const PublicChatMessage = require("./PublicChatMessage");
class PublicRoomUser extends Model {}

PublicRoomUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        sequelize,
        timestamps: false,
    }
);

PublicRoomUser.hasMany(PublicChatMessage);
PublicChatMessage.belongsTo(PublicRoomUser);

module.exports = PublicRoomUser;