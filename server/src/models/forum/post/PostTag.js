const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../../SQLize");
const TagMetric = require("../metric/TagMetric");

class PostTag extends Model {
}

PostTag.init(
    {
        name: DataTypes.STRING,
    }, {
        sequelize,
        updatedAt: false,
    }
)

PostTag.hasMany(TagMetric)
TagMetric.belongsTo(PostTag)

module.exports = PostTag;