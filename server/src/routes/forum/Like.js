const CommentLike = require("../../models/forum/comment/CommentLike");
const Comment = require("../../models/forum/comment/Comment");
const Post = require("../../models/forum/post/Post");
const PostLike = require("../../models/forum/post/PostLike");
const router = require("express").Router();
const { JwtMiddleware } = require("../../utils/JWT");
const { log } = require("../../utils/Logger");

// routes
// /likes?type=comment&id=1&like=true -> comment likes
// /likes?type=post&id=1&like=true -> post likes
// /likes?type=comment&id=1&like=false -> comment dislikes
// /likes?type=post&id=1&like=false -> post dislikes

// if post is not PUBLISHED and requested by USER -> 404
// if requested by MOD | ADMIN -> 200

router.get("/", async (req, res) => {
  const { userId, role } = req;
  // type: comment | post
  // id: commentId | postId
  // like: true | false -> like | dislike
  const { type, id, like } = req.query;

  try {
    // if not enough information provided
    if (!type || !id || like === undefined) {
      return res.status(400).json({
        message: "Bad request",
        fields: {
          type: "post or comment",
          id: "commentId or postId",
          like: "true or false, indicate likes or dislikes",
        },
      });
    }

    // if type is not comment or post
    if (type !== "comment" && type !== "post") {
      return res
        .status(400)
        .json({ message: "Bad request", fields: { type: "post or comment" } });
    }

    // if like is not true or false
    if (like !== "true" && like !== "false") {
      return res
        .status(400)
        .json({ message: "Bad request", fields: { like: "true or false" } });
    }

    // if type is comment
    if (type === "comment") {
      // if comment does not exist
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      // if comment is on a post that is not published
      const post = await Post.findByPk(comment.PostId);
      if (post.status !== "PUBLISHED" && userId !== post.UserId) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // if like is true
      if (like === "true") {
        // get likes
        const likes = await CommentLike.count({
          where: { CommentId: id, isDislike: false },
        });
        return res.status(200).json({ likes });
      } else {
        // if like is false
        const dislikes = await CommentLike.count({
          where: { CommentId: id, isDislike: true },
        });
        return res.status(200).json({ dislikes });
      }
    }

    // if type is post
    if (type === "post") {
      // if post does not exist
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      // if post is not published
      if (post.status !== "PUBLISHED" && userId !== post.UserId) {
        return res.status(404).json({ message: "Post not found" });
      }

      // if like is true
      if (like === "true") {
        // get likes
        const likes = await PostLike.count({
          where: { PostId: id, isDislike: false },
        });
        return res.status(200).json({ likes });
      } else {
        // if like is false
        const dislikes = await PostLike.count({
          where: { PostId: id, isDislike: true },
        });
        return res.status(200).json({ dislikes });
      }
    }

    return res.status(404).json({ message: "Not found" });
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error" });
  }
});

router.post("/", async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { userId } = req;
    const { type, id, like } = req.body;

    // if not enough information provided
    if (!type || !id || like === undefined) {
      return res.status(400).json({
        message: "Bad request",
        fields: {
          type: "post or comment",
          id: "commentId or postId",
          like: "true or false, indicate likes or dislikes",
        },
      });
    }

    // if type is not comment or post
    if (type !== "comment" && type !== "post") {
      return res
        .status(400)
        .json({ message: "Bad request", fields: { type: "post or comment" } });
    }

    // if like is not true or false
    if (like !== true && like !== false) {
      return res
        .status(400)
        .json({ message: "Bad request", fields: { like: "true or false" } });
    }

    // if type is comment
    if (type === "comment") {
      // if comment does not exist
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // if like is true
      if (like) {
        // invalidate likes and dislikes of the user
        await CommentLike.destroy({ where: { UserId: userId, CommentId: id } });
        // like the comment
        await CommentLike.create({ UserId: userId, CommentId: id });
        return res.status(200).json({ message: "Comment liked" });
      } else {
        // dislike the comment
        await CommentLike.destroy({ where: { UserId: userId, CommentId: id } });
        await CommentLike.create({
          UserId: userId,
          CommentId: id,
          isDislike: true,
        });
        return res.status(200).json({ message: "Comment disliked" });
      }
    }

    // if type is post
    if (type === "post") {
      // if post does not exist
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // if like is true
      if (like) {
        // invalidate likes and dislikes of the user
        await PostLike.destroy({ where: { UserId: userId, PostId: id } });
        // like the post
        await PostLike.create({ UserId: userId, PostId: id });
        return res.status(200).json({ message: "Post liked" });
      } else {
        await PostLike.destroy({ where: { UserId: userId, PostId: id } });
        // dislike the post
        await PostLike.create({ UserId: userId, PostId: id, isDislike: true });
        return res.status(200).json({ message: "Post disliked" });
      }
    }

    return res.status(404).json({ message: "Not found" });
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error" });
  }
});

router.get("/did", async (req, res) => {
  // type, id from query
  // userId from req
  const { userId } = req;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { type, id } = req.query;

    // if not enough information provided
    if (!type || !id) {
      return res.status(400).json({
        message: "Bad request",
        fields: {
          type: "post or comment",
          id: "commentId or postId",
        },
      });
    }

    // if type is not comment or post
    if (type !== "comment" && type !== "post") {
      return res
        .status(400)
        .json({ message: "Bad request", fields: { type: "post or comment" } });
    }

    // if type is comment
    if (type === "comment") {
      // if comment does not exist
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // if user liked the comment
      const like = await CommentLike.findOne({
        where: { UserId: userId, CommentId: id },
      });
      if (like) {
        return res.status(200).json({ did: true });
      } else {
        return res.status(200).json({ did: false });
      }
    }

    // if type is post
    if (type === "post") {
      // if post does not exist
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // if user liked the post
      const like = await PostLike.findOne({
        where: { UserId: userId, PostId: id },
      });
      if (like) {
        return res.status(200).json({ did: true });
      } else {
        return res.status(200).json({ did: false });
      }
    }

    return res.status(404).json({ message: "Not found" });
  } catch (err) {
    return res.status(500).json({ message: "Unexpected error" });
  }
});

module.exports = router;
