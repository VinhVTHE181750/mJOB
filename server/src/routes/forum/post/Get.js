const Post = require("../../../models/forum/post/Post");

const selectAllPosts = async () => {
  const posts = await Post.findAll({
    where: {
      status: "PUBLISHED",
    },
  });
  return posts;
};

const selectPostById = async (id) => {
  const post = await Post.findByPk(id);
  return post;
};

const selectAllPostsOfUser = async (userId) => {
  const posts = await Post.findAll({
    where: {
      userId,
    },
  });
  return posts;
};

const selectPostViewById = async (id) => {
  const post = await Post.findByPk(id);
  return post.viewCount;
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await selectAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await selectPostById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getPostOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await selectAllPostsOfUser(userId);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getPostViewById = async (req, res) => {
  try {
    const { id } = req.params;
    const viewCount = await selectPostViewById(id);
    res.status(200).json(viewCount);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostOfUser,
  getPostViewById,
};
