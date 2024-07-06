const Post = require("../../../models/forum/post/Post");

const deleteById = async (req, res) => {
  try {
    const { id } = req.body;

    const post = await Post.findOne({
      where: {
        id: id,
      },
    });

    if (!post) {
      return res.status(404).send();
    }

    await post.destroy();
    

    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  deleteById,
};
