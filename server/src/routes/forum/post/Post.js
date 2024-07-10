const User = require("../../../models/User");
const PostCategory = require("../../../models/forum/post/PostCategory");
const Post = require("../../../models/forum/post/Post");
const PostHistory = require("../../../models/forum/post/PostHistory");

const post = async (req, res) => {
  try {
    console.log(req.body)
    let postInput = req.body.post;

    let msg;
    let PostCategoryId;

    if (!postInput.category && !postInput.categoryId) {
      res
        .status(400)
        .json({ message: "Category or category ID must be provided." });
      return;
    }
    if (postInput.categoryId) {
      const cId = await PostCategory.findByPk(postInput.categoryId);
      if (!cId) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      PostCategoryId = postInput.categoryId;
    }

    if (postInput.category) {
      const cName = await PostCategory.findOne({
        where: {
          name: postInput.category,
        },
      });
      if (!cName) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      if (PostCategoryId) {
        msg = "Category ID and name provided. Using Category ID.";
      } else {
        PostCategoryId = cName.id;
      }
    }
    if (!postInput.title || postInput.title === "") {
      res.status(400).json({ message: "Post title cannot be empty." });
      return;
    }

    if (!postInput.content || postInput.content === "") {
      res.status(400).json({ message: "Post content cannot be empty." });
      return;
    }

    let UserId;

    if (!postInput.userId && !postInput.username) {
      res
        .status(400)
        .json({ message: "User ID or username must be provided." });
      return;
    }
    if (postInput.userId) {
      const userExists = await User.findByPk(postInput.userId);
      if (!userExists) {
        res.status(404).json({ message: "User not found." });
        return;
      }
      UserId = postInput.userId;
    }

    let message;
    if (postInput.username) {
      const userExists = await User.findOne({ where: { username: postInput.username } });
      if (!userExists) {
        res.status(404).json({ message: "User not found." });
        return;
      }
      if (UserId) {
        message = "User ID and username provided. Using User ID.";
      } else {
        UserId = userExists.id;
      }
    }

    if (postInput.tags && postInput.tags.length > 0) {
      for (let tag of postInput.tags) {
        if (tag === "") {
          res.status(400).json({ message: "Tag cannot be empty." });
          return;
        }
      }
    }

    const post = await Post.create({
      title: postInput.title,
      content: postInput.content,
      UserId,
      status: postInput.status,
      PostCategoryId,
      tags: postInput.tags,
    });
    await PostHistory.create({
      title: post.title,
      content: post.content,
      tags: post.tags,
      action: "CREATE",
      PostCategoryId: post.PostCategoryId,
      UserId: post.UserId,
      PostId: post.id,
    });
    res.status(201).send({ post, message, msg });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unexpected error while creating post" });
  }
};

module.exports = {
  post,
};