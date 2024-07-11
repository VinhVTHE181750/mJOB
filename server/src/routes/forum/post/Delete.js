const Post = require("../../../models/forum/post/Post");
const { log } = require("../../../utils/Logger");

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Unexpected error while deleting post." });
  }
};

module.exports = {
  deleteById,
};
