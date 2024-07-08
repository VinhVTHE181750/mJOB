const { sequelize } = require("../../SQLize");
const {Model, DataTypes} = require("sequelize");
const PublicChatMessage = require("./PublicChatMessage");
const PublicChatMetric = require("../metric/PublicChatMetric");

class PublicChatRoom extends Model {}
// This is a model of a public chat room
// Staff can lock the room to prevent users from sending messages
// Admin can add/remove rooms and set a required role to access the room


PublicChatRoom.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isLocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        requiredRole: {
            type: DataTypes.ENUM("USER", "STAFF", "SUPPORT", "ADMIN"),
            defaultValue: "USER",
        }
    },
    {
        sequelize,
    }
);

PublicChatRoom.hasMany(PublicChatMetric);
PublicChatMetric.belongsTo(PublicChatRoom);

module.exports = PublicChatRoom;