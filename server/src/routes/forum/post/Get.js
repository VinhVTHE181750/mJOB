const Post = require("../../../models/forum/post/Post");
const { where, Op } = require("sequelize");
const { log } = require("../../../utils/Logger");

const getAllPosts = async (req, res) => {
  try {
    let posts;
    if (req.userId && (req.role === "ADMIN" || req.role === "MOD")) {
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
  let userId;
  if (req.userId) userId = req.userId;
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    if (post.status === "PUBLISHED") {
      return res.status(200).json(post);
    }
    if (req.role === "ADMIN" || req.role === "MOD") {
      return res.status(200).json(post);
    }

    if (userId) {
      if (post.UserId === userId) {
        return res.status(200).json(post);
      }
    }
    return res.status(404).json({ message: "Post not found" });
  } catch (err) {
    log(err, "ERROR");
    res
      .status(500)
      .json({ message: "Unexpected error while fetching this post" });
  }
};

const getPostOfUser = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const isAdminOrMod = req.role === "ADMIN" || req.role === "MOD";
  const isSameUser = Number(req.userId) === Number(req.params.id);

  if (!isAdminOrMod && !isSameUser) {
    const posts = await Post.findAll({
      where: {
        UserId: id,
        status: {
          [Op.or]: ["PUBLISHED", "DELISTED"],
        },
      },
    });
    return res.status(200).json(posts);
  }

  try {
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
