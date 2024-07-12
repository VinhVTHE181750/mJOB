const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Accomplishment extends Model {}

Accomplishment.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
    }, {
        sequelize,
    }
);

module.exports = Accomplishment;