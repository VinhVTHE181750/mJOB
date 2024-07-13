const {sequelize} = require("../../SQLize");

const {DataTypes, Model} = require("sequelize");

class CategoryMetric extends Model {
}

CategoryMetric.init(
    {
        PostCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "PostCategories",
                key: "id",
            },
        },
        day: {
            type: DataTypes.DATEONLY,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        usage: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        setterMethods: {
            _incrementUsage() {
                this.usage++;
            },
            _decrementUsage() {
                this.usage--;
            },
        },
        updatedAt: false,
    }
);

module.exports = CategoryMetric;