const Post = require("../../../models/forum/post/Post");
const { where, Op, Sequelize } = require("sequelize");
const { log } = require("../../../utils/Logger");
const PostMetric = require("../../../models/forum/metric/PostMetric");
const PostLike = require("../../../models/forum/post/PostLike");
const Comment = require("../../../models/forum/comment/Comment");
const User = require("../../../models/user/User");

const getAllPosts = async (req, res) => {
  try {
    let posts;
    if (req.userId && (req.role === "ADMIN" || req.role === "MOD")) {
      posts = await Post.findAll({});
    } else {
      posts = await Post.findAll({
        where: {
          status: "PUBLISHED",
        },
      });
    }
    if (posts && posts.length > 0) {
      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          const likes = await PostLike.count({
            where: { PostId: post.id, isDislike: false },
          });

          const views = await PostMetric.sum("views", {
            where: { PostId: post.id },
          });

          const dislikes = await PostLike.count({
            where: { PostId: post.id, isDislike: true },
          });

          const comments = await Comment.count({ where: { PostId: post.id } });

          const user = await User.findOne({ where: { id: post.UserId } });
          const author = user.username;
          const authorAvatar = user.avatar || "";

          return {
            ...post.toJSON(),
            likes: likes || 0,
            views: views || 0,
            dislikes: dislikes || 0,
            comments: comments || 0,
            author,
            authorAvatar,
          };
        })
      );

      return res.status(200).json(updatedPosts);

      // wait until all posts are updated with likes, views, dislikes and comments
      // await Promise.all(posts);
      // return res.status(200).json(posts);
    }
    return res.status(404).json({ message: "No posts found." });
  } catch (err) {
    log(err, "ERROR", "FORUM");
    res.status(500).json({ message: err });
  }
};

const getPostById = async (req, res) => {
  let userId;
  if (req.userId) userId = req.userId;
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    let likes = await PostLike.count({
      where: { PostId: id, isDislike: false },
    });

    let liked = false;
    let isDislike = null;

    if (userId) {
      const interact = await PostLike.findOne({
        where: { PostId: id, UserId: userId },
      });
      if (interact) {
        liked = true;
        isDislike = interact.isDislike;
      }
    }

    let views = await PostMetric.sum("views", { where: { PostId: id } });

    let dislikes = await PostLike.count({
      where: { PostId: id, isDislike: true },
    });

    let comments = await Comment.count({ where: { PostId: id } });

    const user = await User.findOne({ where: { id: post.UserId } });
    const author = user.username;

    const response = {
      id: post.id,
      title: post.title,
      content: post.content,
      tags: post.tags,
      views: views || 0,
      likes: likes || 0,
      liked: liked || false,
      isDislike: isDislike || false,
      comments: comments || 0,
      dislikes: dislikes || 0,
      author: author || "Unknown",
      PostCategoryId: post.PostCategoryId,
      UserId: post.UserId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    if (post.status === "PUBLISHED") {
      const [todayMetric, tmCreated] = await PostMetric.findOrCreate({
        where: {
          PostId: id,
          day: new Date().toISOString().split("T")[0],
        },
        defaults: {
          views: 1,
        },
      });

      if (!tmCreated) {
        await todayMetric.increment("views");
      }

      return res.status(200).json(response);
    }
    if (req.role === "ADMIN" || req.role === "MOD") {
      // does not count view from ADMIN, MOD or author if not published
      return res.status(200).json(response);
    }

    if (userId) {
      if (post.UserId === userId) {
        return res.status(200).json(response);
      }
    }
    return res.status(404).json({ message: "Post not found" });
  } catch (err) {
    log(err, "ERROR", "FORUM");
    console.log(err);
    res.status(500).json({ message: "Unexpected error while fetching this post" });
  }
};

const getPostOfUser = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ message: "Invalid user id" });
  const isAdminOrMod = req.role === "ADMIN" || req.role === "MOD";
  const isSameUser = Number(req.userId) === Number(req.params.id);
  try {
    let posts;
    if (!isAdminOrMod && !isSameUser) {
      posts = await Post.findAll({
        where: {
          UserId: id,
          status: {
            [Op.or]: ["PUBLISHED", "DELISTED"],
          },
        },
      });
    } else {
      const posts = await Post.findAll({
        where: {
          UserId: id,
        },
      });
    }
    return posts && posts.length > 0 ? res.status(200).json(posts) : res.status(404).json({ message: "No posts found." });
  } catch (err) {
    log(err, "ERROR", "FORUM");
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostOfUser,
};
