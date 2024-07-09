const Post = require("../../../models/forum/post/Post");
const {where} = require("sequelize");
const { log } = require("../../../utils/Logger");

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                status: "PUBLISHED",
            }
        });
        (posts && posts.length > 0) ? res.status(200).json(posts) : res.status(404).json({message: "No posts found."});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err});
    }
};

const getPostById = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByPk(id);
        post ? res.status(200).json(post) : res.status(404).json({message: "Post not found."});
    } catch (err) {
        res.status(500).json({message: err});
    }
};

const getPostOfUser = async (req, res) => {
    try {
        const {id} = req.params;
        const posts = await Post.findAll({
            where: {
                UserId: id,
            }
        });
        (posts && posts.length > 0) ? res.status(200).json(posts) : res.status(404).json({message: "No posts found."});
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err});
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    getPostOfUser,
};
