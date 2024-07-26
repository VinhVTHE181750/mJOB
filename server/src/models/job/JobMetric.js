const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class JobMetric extends Model { }

JobMetric.init(
    {
        // FK: JobId
        view: DataTypes.INTEGER,
    },
    {
        sequelize,
        paranoid: true,
    }
);

module.exports = JobMetric;
