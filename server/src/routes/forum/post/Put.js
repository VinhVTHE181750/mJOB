const Post = require("../../../models/forum/post/Post");
const PostCategory = require("../../../models/forum/post/PostCategory");
// const User = require("../../../models/user/User");
const PostHistory = require("../../../models/forum/post/PostHistory");
const { log } = require("../../../utils/Logger");
// const { getIo } = require("../../../../io");
const PostMetric = require("../../../models/forum/metric/PostMetric");

const put = async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const { id, title, content, userId, status, category, tags } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }
    const post = await Post.findByPk(id);

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
      post.title = title || post.title;
      post.content = content || post.content;
      post.tags = tags || post.tags;

      if (category) {
        const postCategory = await PostCategory.findOne({
          where: { name: category },
        });
        if (!postCategory) {
          res.status(400).json({ message: "Invalid category." });
          return;
        }
        post.PostCategoryId = postCategory.id;
      }

      if (post.status === "DRAFT" && status === "PUBLISHED") {
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
        title ||
        content ||
        tags ||
        category
      ) {
        res.status(400).json({
          message: "Cannot only update status of another user's post.",
        });
        return;
      }
      if (status && status !== "DRAFT") {
        post.status = status;
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
      PostMetric.findOrCreate({
        where: {
          PostId: post.id,
          day: new Date().toISOString().split("T")[0],
        },
      }).then(([metric]) => metric.increment(["updates"])),
      
    ]);

    // const io = getIo();
    // io.emit("posts", { action: "UPDATE", post });
    return res.status(200).json(post);
  } catch (err) {
    log(err, "ERROR", "FORUM");
    return res
      .status(500)
      .json({ message: "Unexpected error while updating post." });
  }
};

module.exports = {
  put,
};
