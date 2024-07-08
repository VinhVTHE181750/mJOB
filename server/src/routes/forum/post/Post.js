const User = require("../../../models/User");
const PostCategory = require("../../../models/forum/post/PostCategory");
const Post = require("../../../models/forum/post/Post");
const PostHistory = require("../../../models/forum/post/PostHistory");

const post = async (req, res) => {
    try {
        const {title, content, userId, username, status, tags, category, categoryId} = req.body;

        let msg;
        let PostCategoryId;

        if (!category && !categoryId) {
            res.status(400).json({message: "Category or category ID must be provided."});
            return;
        }
        if (categoryId) {
            const cId = await PostCategory.findByPk(categoryId)
            if (!cId) {
                res.status(404).json({message: "Category not found."});
                return;
            }
            PostCategoryId = categoryId;
        }


        if (category) {
            const cName = await PostCategory.findOne({
                where: {
                    name: category
                }
            })
            if (!cName) {
                res.status(404).json({message: "Category not found."});
                return;
            }
            if (PostCategoryId) {
                msg = "Category ID and name provided. Using Category ID.";
            } else {
                PostCategoryId = cName.id;
            }
        }
        if (!title || title === "") {
            res.status(400).json({message: "Post title cannot be empty."});
            return;
        }

        if (!content || content === "") {
            res.status(400).json({message: "Post content cannot be empty."});
            return;
        }

        let UserId;

        if (!userId && !username) {
            res.status(400).json({message: "User ID or username must be provided."});
            return;
        }
        if (userId) {
            const userExists = await User.findByPk(userId);
            if (!userExists) {
                res.status(404).json({message: "User not found."});
                return;
            }
            UserId = userId;
        }

        let message
        if (username) {
            const userExists = await User.findOne({where: {username}});
            if (!userExists) {
                res.status(404).json({message: "User not found."});
                return;
            }
            if (UserId) {
                message = "User ID and username provided. Using User ID.";
            } else {
                UserId = userExists.id;
            }
        }

        if (tags && tags.length > 0) {
            for (let tag of tags) {
                if (tag === "") {
                    res.status(400).json({message: "Tag cannot be empty."});
                    return;
                }
            }
        }

        const post = await Post.create({title, content, UserId, status, PostCategoryId, tags});
        await PostHistory.create({
            title: post.title,
            content: post.content,
            tags: post.tags,
            action: "CREATE",
            PostCategoryId: post.PostCategoryId,
            UserId: post.UserId,
            PostId: post.id,
        })
        res.status(201).send({post, message, msg});
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};

module.exports = {
    post,
}