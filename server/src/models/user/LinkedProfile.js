const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class LinkedProfile extends Model {}

LinkedProfile.init(
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
    }
);

module.exports = LinkedProfile;