const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../../SQLize");
const CategoryMetric = require("../metric/CategoryMetric");

class PostCategory extends Model {
}

PostCategory.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fgColor: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        bgColor: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
    }
);

PostCategory.hasMany(CategoryMetric);
CategoryMetric.belongsTo(PostCategory);

module.exports = PostCategory;
