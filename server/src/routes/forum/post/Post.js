const User = require("../../../models/user/User");
const PostCategory = require("../../../models/forum/post/PostCategory");
const Post = require("../../../models/forum/post/Post");
const PostHistory = require("../../../models/forum/post/PostHistory");
const { log } = require("../../../utils/Logger");
const io = require("../../../../io");

const post = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    // console.log(req.body);
    let { title, content, status, category, tags } = req.body;
    let msg;
    let PostCategoryId;

    // if status is not PUBLISHED or DRAFT, return 400
    if (status !== "PUBLISHED" && status !== "DRAFT") {
      return res.status(400).json({ message: "Post can only be created as PUBLISHED or DRAFT." });
    }
    let action = status === "PUBLISHED" ? "PUBLISH" : "DRAFT";

    if (!category) {
      res.status(400).json({ message: "Category must be provided." });
      return;
    }
    // if (categoryId) {
    //   const cId = await PostCategory.findByPk(categoryId);
    //   if (!cId) {
    //     res.status(404).json({ message: "Category not found." });
    //     return;
    //   }
    //   PostCategoryId = categoryId;
    // }

    if (category) {
      const cName = await PostCategory.findOne({
        where: {
          name: category,
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
    if (!title || title === "") {
      res.status(400).json({ message: "Post title cannot be empty." });
      return;
    }

    if (!content || content === "") {
      res.status(400).json({ message: "Post content cannot be empty." });
      return;
    }

    if (tags === "") {
      tags = undefined;
    }

    if (tags && tags.length > 0) {
      for (let tag of tags) {
        if (tag === "") {
          res.status(400).json({ message: "Tag cannot be empty." });
          return;
        }
      }
    }

    const post = await Post.create({
      title: title,
      content: content,
      UserId: userId,
      status: status,
      PostCategoryId,
      tags: tags,
    });
    await PostHistory.create({
      title: post.title,
      content: post.content,
      tags: post.tags,
      action: action,
      status: post.status,
      PostCategoryId: post.PostCategoryId,
      UserId: post.UserId,
      PostId: post.id,
    });
    io.getIo().emit("forum/posts");
    return res.status(201).send({ post });
  } catch (err) {
    log(err, "ERROR", "FORUM");
    return res.status(500).json({ message: "Unexpected error while creating post" });
  }
};

module.exports = {
  post,
};
