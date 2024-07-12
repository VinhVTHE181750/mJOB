const { sequelize } = require("../../../models/SQLize");
const Comment = require("../../../models/forum/comment/Comment");
const { log } = require("../../../utils/Logger");

const getComments = async (req, res) => {
  try {
    const { postId } = req.query;

    // If postId is provided, return all comments for that post
    if (postId) {
      const result = await Comment.findAll({
        where: { PostId: postId },
      });
      return res.status(200).json(result);
    } else return res.status(400).json({ message: "PostId is required" });
  } catch (err) {
    log(err, "ERROR", "FORUM");
    return res.status(500).json({ message: "Error occurred", error: err });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Comment.findByPk(id);
    if (result) return res.status(200).json(result);
    else return res.status(404).json({ message: "No comment found" });
  } catch (err) {
    log(err, "ERROR", "FORUM");
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

module.exports = {
  getComments,
  getCommentById
};
