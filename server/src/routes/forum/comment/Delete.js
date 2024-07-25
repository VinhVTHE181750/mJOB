const { getIo } = require("../../../../io");
const Comment = require("../../../models/forum/comment/Comment");
const { log } = require("../../../utils/Logger");

const deleteById = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    const postId = comment.PostId;
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (req.role === "ADMIN" || req.role === "MOD") {
      await comment.destroy();
      getIo().emit(`forum/comments/${postId}`);
      return res.status(200).send();
    } else {
      if (comment.UserId !== req.userId) return res.status(401).json({ message: "Unauthorized" });
    }
    await comment.destroy();
    getIo().emit(`forum/comments/${postId}`);
    return res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error while deleting comment" });
  }
};

module.exports = {
  deleteById,
};
