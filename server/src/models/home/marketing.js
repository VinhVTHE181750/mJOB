const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Marketing extends Model { }

Marketing.init(
    {
        // Title
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Description
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);

module.exports = Marketing;
