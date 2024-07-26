const Post = require("../../../models/forum/post/Post");
const {log} = require("../../../utils/Logger");

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    log(JSON.stringify(post), 'ERROR', 'FORUM')
    log(id, 'ERROR', 'FORUM')

    if (!post) {
      return res.status(404).json({message: "Post not found"});
    }

    await post.destroy();
    res.status(200).json({message: "Post deleted"});

  } catch (err) {
    console.error(err);
    res.status(500).json({message: ""});
  }
};

module.exports = {
  deleteById,
};
