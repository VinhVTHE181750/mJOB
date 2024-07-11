const User = require("../../../models/User");
const PostCategory = require("../../../models/forum/post/PostCategory");
const Post = require("../../../models/forum/post/Post");
const PostHistory = require("../../../models/forum/post/PostHistory");

const post = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  try {
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
      UserId: userId,
      status: postInput.status,
      PostCategoryId,
      tags: postInput.tags,
    });
    await PostHistory.create({
      title: post.title,
      content: post.content,
      tags: post.tags,
      action: "CREATE",
      status: post.status,
      PostCategoryId: post.PostCategoryId,
      UserId: post.UserId,
      PostId: post.id,
    });
    res.status(201).send({ post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unexpected error while creating post" });
  }
};

module.exports = {
  post,
};
