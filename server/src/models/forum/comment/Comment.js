const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../../SQLize");
const CommentLike = require("./CommentLike");
const CommentMetric = require("../metric/CommentMetric");

class Comment extends Model {
}

Comment.init(
    {
        content: DataTypes.TEXT,
    },
    {
        sequelize,
        paranoid: true,
    }
);

Comment.hasMany(CommentLike);
CommentLike.belongsTo(Comment);

Comment.hasMany(CommentMetric)
CommentMetric.belongsTo(Comment)

module.exports = Comment;
