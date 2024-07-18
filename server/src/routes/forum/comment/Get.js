const { sequelize } = require("../../../models/SQLize");
const Comment = require("../../../models/forum/comment/Comment");
const { log } = require("../../../utils/Logger");

const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    // If postId is provided, return all comments for that post
    if (id) {
      const result = await Comment.findAll({
        where: { PostId: id },
      });
      return res.status(200).json(result);
    } else return res.status(400).json({ message: "id (of post) is required" });
  } catch (err) {
    log(err, "ERROR", "FORUM");
    return res.status(500).json({ message: "Error occurred", error: err });
  }
};

module.exports = {
  getComments,
};
