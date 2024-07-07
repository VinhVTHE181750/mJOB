const User = require("../../../models/User");
const PostCategory = require("../../../models/forum/PostCategory");
const Post = require("../../../models/forum/post/Post");
const PostHistory = require("../../../models/forum/post/PostHistory");

const insertPost = async (title, content, userId, status, categoryId, tags) => {
  const post = await Post.create({
    title,
    content,
    userId,
    status,
    PostCategoryId: categoryId,
  });
  return post.id;
};

const insertPostHistory = async (postId, title, content) => {
  await PostHistory.create({
    postId,
    title,
    content,
  });
};

const post = async (req, res) => {
  try {
    const { title, content, userId, username, status, tags, category, categoryId } = req.body;
    if (status !== "PUBLISHED" && status !== "DRAFT" && status !== "DELISTED") {
      res.status(400).json({ message: "Invalid post status." });
      return;
    }

    if (title === "") {
      res.status(400).json({ message: "Post title cannot be empty." });
      return;
    }

    if (content === "") {
      res.status(400).json({ message: "Post content cannot be empty." });
      return;
    }

    if (isNaN(userId) || userId <= 0) {
      res.status(400).json({ message: "Invalid user id." });
      return;
    }

    if (username === "") {
      res.status(400).json({ message: "Username cannot be empty." });
      return;
    }

    if (tags && tags.length > 0) {
      for (let tag of tags) {
        if (tag === "") {
          res.status(400).json({ message: "Tag cannot be empty." });
          return;
        }
      }
    }

    // if username is used without userId, find userId from username
    if(!userId && username) {
      const userId = await User.findOne({ where: { username } }).id;
      if (!userId) {
        res.status(404).json({ message: "User not found." });
        return;
      }
    }

    // if both userId and username are provided, use userId
    // if none are provided, return 400
    if (userId && username) {
      res.status(400).json({ message: "Provide either userId or username." });
      return;
    }



    if (category) {
      const categoryExists = await PostCategory.findOne({ where: { name: category } });
      if (!categoryExists) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      const categoryId = categoryExists.id;
    }

    const postId = await insertPost(title, content, userId, status, categoryId, tags);
    await insertPostHistory(postId, title, content);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

module.exports = {
  post,
}