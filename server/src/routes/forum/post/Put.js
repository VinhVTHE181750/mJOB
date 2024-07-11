const Post = require("../../../models/forum/post/Post");
const PostCategory = require("../../../models/forum/post/PostCategory");
const User = require("../../../models/User");
const PostHistory = require("../../../models/forum/post/PostHistory");
const { log } = require("../../../utils/Logger");
const { getIo } = require("../../../../io");
const put = async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    let postInput = req.body.post;
    let post = await Post.findByPk(postInput.id);

    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    if (post.UserId !== req.userId && !["ADMIN", "MOD"].includes(req.role)) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (post.status === "DELISTED" && !["ADMIN", "MOD"].includes(req.role)) {
      res.status(400).json({ message: "Cannot update a delisted post." });
      return;
    }

    if (post.status === "PUBLISHED" && postInput.status === "DRAFT") {
      res
        .status(400)
        .json({ message: "Cannot change a published post to draft." });
      return;
    }

    if (
      post.status === "PUBLISHED" &&
      postInput.status === "DELISTED" &&
      !["ADMIN", "MOD"].includes(req.role)
    ) {
      res
        .status(400)
        .json({ message: "Only ADMIN or MOD can delist a published post." });
      return;
    }

    if (post.status === "DRAFT" && postInput.status === "PUBLISHED") {
      post.UserId !== req.userId
        ? res
            .status(400)
            .json({ message: "Only author can publish their post." })
        : (post.status = postInput.status);
    }

    if (post.UserId === req.userId) {
      post.title = postInput.title || post.title;
      post.content = postInput.content || post.content;
    }

    if (["ADMIN", "MOD"].includes(req.role)) {
      post.status = postInput.status || post.status;
    }

    if (postInput.category) {
      const category = await PostCategory.findOne({
        where: { name: postInput.category },
      });
      if (!category) {
        res.status(400).json({ message: "Invalid category." });
        return;
      }
      post.PostCategoryId = category.id;
    }

    await Promise.all([
      post.save(),
      PostHistory.create({
        PostId: post.id,
        title: post.title,
        content: post.content,
        UserId: post.UserId,
        PostCategoryId: post.PostCategoryId,
        tags: post.tags,
        action: "UPDATE",
      }),
    ]);

    const io = getIo();
    io.emit("posts", { action: "update", post });
    log(
      'IO event emitted: "posts", { action: "update", post }',
      "WARN",
      "FORUM"
    );
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unexpected error while updating post." });
  }
};

module.exports = {
  put,
};
