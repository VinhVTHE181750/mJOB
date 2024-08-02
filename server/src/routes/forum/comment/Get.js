const { sequelize } = require("../../../models/SQLize");
const Comment = require("../../../models/forum/comment/Comment");
const User = require("../../../models/user/User"); // Assuming this is the path to the User model
const { log } = require("../../../utils/Logger");

const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const comments = await Comment.findAll({
        where: { PostId: id },
        include: [
          {
            model: User,
            attributes: ["username", "avatar"],
          },
        ],
      });

      // Map over the comments to flatten the structure
      const flattenedComments = comments.map((comment) => {
        // Destructure the comment object to separate User
        const { User, ...restOfComment } = comment.toJSON();
        // Return a new object with the username at the root level
        return {
          ...restOfComment,
          username: User.username, // Flatten User.username to username
          avatar: User.avatar, // Flatten User.avatar to avatar
        };
      });

      return res.status(200).json(flattenedComments);
    } else {
      return res.status(400).json({ message: "id (of post) is required" });
    }
  } catch (err) {
    log(err, "ERROR", "FORUM");
    return res.status(500).json({ message: "Error occurred", error: err });
  }
};

module.exports = {
  getComments,
};
