const { getIo } = require("../../../../io");
const { sequelize } = require("../../../models/SQLize");
const Comment = require("../../../models/forum/comment/Comment");
const Post = require("../../../models/forum/post/Post");
const User = require("../../../models/user/User");
const { log } = require("../../../utils/Logger");

const insertComment = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    const { postId, content } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!content) return res.status(400).json({ message: "Content is required" });

    if (post.status !== "PUBLISHED") {
      if (post.UserId === userId) {
        return res.status(400).json({ message: "You can only comment on published posts" });
      }
      if (req.role === "ADMIN" || req.role === "MOD") {
        return res.status(400).json({ message: "You can only comment on published posts" });
      }
      return res.status(404).json({ message: "Post not found" });
    }

    const result = await Comment.create({
      PostId: postId,
      UserId: userId,
      content,
    });

    getIo().emit(`forum/comments/${postId}`);
    return res.status(201).json(result);
  } catch (err) {
    log(err, "ERROR", "Forum");
    return res.status(500).json({ message: "Unexpected error while inserting comment" });
  }
};

module.exports = {
  insertComment,
};
