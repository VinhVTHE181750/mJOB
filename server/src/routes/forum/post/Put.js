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
    const postInput = req.body.post;
    const post = await Post.findByPk(postInput.id);

    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    // Check if the user is the author or an admin/moderator
    const isAuthor = post.UserId === req.userId;
    const isAdminOrMod = ["ADMIN", "MOD"].includes(req.role);

    if (!isAuthor && !isAdminOrMod) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Author editing their post
    if (isAuthor) {
      post.title = postInput.title || post.title;
      post.content = postInput.content || post.content;
      post.tags = postInput.tags || post.tags;

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

      if (post.status === "DRAFT" && postInput.status === "PUBLISHED") {
        post.status = "PUBLISHED";
      }

      if (post.status !== "PUBLISHED") {
        res
          .status(400)
          .json({ message: "Can not change status of a published post." });
        return;
      }
    }

    // State flow:
    // DRAFT -> PUBLISHED -> DELISTED -> DELETED
    //          PUBLISHED -> DELETED
    // DRAFT -> DELETED

    // Admin or Mod changing the status from PUBLISHED to DELISTED
    if (isAdminOrMod) {
      // if attempt to update anything except status, return 400
      if (
        postInput.title ||
        postInput.content ||
        postInput.tags ||
        postInput.category
      ) {
        res.status(400).json({ message: "Cannot only update status of another user's post." });
        return;
      }
      if (postInput.status && postInput.status !== "DRAFT") {
        post.status = postInput.status;
      } else {
        res
          .status(400)
          .json({ message: "Cannot change the status of a post to draft" });
        return;
      }
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
        status: post.status,
        action: "UPDATE",
      }),
    ]);

    const io = getIo();
    io.emit("posts", { action: "UPDATE", post });
    log(
      'IO event emitted: "posts", { action: "update", post }',
      "WARN",
      "FORUM"
    );
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Unexpected error while updating post." });
  }
};

module.exports = {
  put,
};
