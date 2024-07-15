const Post = require("../../../models/forum/post/Post");
const PostHistory = require("../../../models/forum/post/PostHistory");
const { log } = require("../../../utils/Logger");

const deleteById = async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
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
        content: post.content,
        title: post.title,
        status: post.status,
        tags: post.tags,
        PostCategoryId: post.PostCategoryId,
      }),
      await post.destroy(),
    ]);
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    log(err, "ERROR", "FORUM");
    return res
      .status(500)
      .json({ message: "Unexpected error while deleting post." });
  }
};

module.exports = {
  deleteById,
};
