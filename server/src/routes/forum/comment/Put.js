const Comment = require("../../../models/forum/comment/Comment");

const put = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    const { id, content } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.UserId !== req.userId)
      return res.status(401).json({ message: "Unauthorized" });
    if (!content)
      return res.status(400).json({ message: "Content is required" });
    comment.content = content;
    await comment.save();
    return res.status(200).json(comment);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unexpected error while updating comment" });
  }
};

module.exports = {
  put,
};
