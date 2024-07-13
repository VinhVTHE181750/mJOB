const Post = require("../../../models/forum/post/Post");
const PostHistory = require("../../../models/forum/post/PostHistory");
const { log } = require("../../../utils/Logger");

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const role = req.role;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.UserId !== userId && role !== "ADMIN") {
      if (post.status === "PUBLISHED")
        return res.status(401).json({ message: "Unauthorized" });
      else return res.status(404).json({ message: "Post not found" });
    }

    Promise.all([
      await PostHistory.create({
        PostId: post.id,
        action: "DELETE",
        UserId: req.userId,
      }),
      await post.destroy(),
    ]);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Unexpected error while deleting post." });
  }
};

module.exports = {
  deleteById,
};
