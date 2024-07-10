const Post = require("../../../models/forum/post/Post");
const { where } = require("sequelize");
const { log } = require("../../../utils/Logger");

const getAllPosts = async (req, res) => {
  try {
    let posts;
    if (req.loggedIn && (req.role === "ADMIN" || req.role === "MOD")) {
      posts = await Post.findAll();
    } else {
      posts = await Post.findAll({
        where: {
          status: "PUBLISHED",
        },
      });
    }
    posts && posts.length > 0
      ? res.status(200).json(posts)
      : res.status(404).json({ message: "No posts found." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getPostById = async (req, res) => {
  if (req.loggedIn) userId = req.userId;
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    if (req.loggedIn && (req.role === "ADMIN" || req.role === "MOD")) {
      return res.status(200).json(post);
    }
    if (post.getDataValue("status") === "PUBLISHED") {
      return res.status(200).json(post);
    } else {
      if (post.UserId === userId) return res.status(200).json(post);
      return res.status(404).json({ message: "Post not found." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getPostOfUser = async (req, res) => {
  if (!req.loggedIn) return res.status(401).json({ message: "Unauthorized" });

  const isAdminOrMod = req.role === "ADMIN" || req.role === "MOD";
  const isSameUser = Number(req.userId) === Number(req.params.id);

  if (!isAdminOrMod && !isSameUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { id } = req.params;
    const posts = await Post.findAll({
      where: {
        UserId: id,
      },
    });
    posts && posts.length > 0
      ? res.status(200).json(posts)
      : res.status(404).json({ message: "No posts found." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostOfUser,
};
