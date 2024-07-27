const CommentLike = require("../../models/forum/comment/CommentLike");
const PostLike = require("../../models/forum/post/PostLike");
const router = require("express").Router();

const countLikesByCommentId = async (commentId) => {
  const likes = await CommentLike.count({
    where: {
      commentId,
      isDislike: false,
    },
  });
  const dislikes = await CommentLike.count({
    where: {
      commentId,
      isDislike: true,
    },
  });
  return { likes, dislikes };
};
const countLikesByPostId = async (postId) => {
  const likes = await PostLike.count({
    where: {
      postId,
      isDislike: false,
    },
  });
  const dislikes = await PostLike.count({
    where: {
      postId,
      isDislike: true,
    },
  });
  return { likes, dislikes };
};

const likeComment = async (commentId, userId, isDislike) => {
  const like = await CommentLike.findOne({
    where: {
      commentId,
      userId,
    },
  });
  if (like) {
    like.isDislike = isDislike;
    await like.save();
  } else {
    await CommentLike.create({
      commentId,
      userId,
      isDislike,
    });
  }
};

const likePost = async (postId, userId, isDislike) => {
  const like = await PostLike.findOne({
    where: {
      postId,
      userId,
    },
  });
  if (like) {
    like.isDislike = isDislike;
    await like.save();
  } else {
    await PostLike.create({
      postId,
      userId,
      isDislike,
    });
  }
};

const unlikeComment = async (commentId, userId) => {
  const like = await CommentLike.findOne({
    where: {
      commentId,
      userId,
    },
  });
  if (like) {
    await like.destroy();
  }
};

const unlikePost = async (postId, userId) => {
  const like = await PostLike.findOne({
    where: {
      postId,
      userId,
    },
  });
  if (like) {
    await like.destroy();
  }
};

const getLikes = async (req, res) => {
  try {
    const { postId, commentId } = req.query;
    if ((!postId && !commentId) || (postId && commentId)) {
      res.status(400).send();
    }

    if (postId) {
      const { likes, dislikes } = await countLikesByPostId(postId);
      res.status(200).json({ likes, dislikes });
    } else {
      const { likes, dislikes } = await countLikesByCommentId(commentId);
      res.status(200).json({ likes, dislikes });
    }
  } catch (err) {
    res.status(500).send();
  }
};

const likedByUser = async (req, res) => {
  try {
    const { postId, userId, commentId } = req.query;
    if ((!postId && !commentId) || (postId && commentId)) {
      res.status(400).send();
    }

    if (postId) {
      const like = await PostLike.findOne({
        where: {
          postId,
          userId,
        },
      });
      if (like) {
        res.status(200).json(like);
      } else {
        res.status(404).send();
      }
    } else {
      const like = await CommentLike.findOne({
        where: {
          commentId,
          userId,
        },
      });
      if (like) {
        res.status(200).json(like);
      } else {
        res.status(404).send();
      }
    }
  } catch (err) {
    res.status(500).send();
  }
};

const like = async (req, res) => {
  try {
    const { postId, userId, isDislike, commentId } = req.body;
    if ((!postId && !commentId) || (postId && commentId)) {
      res.status(400).send();
    }

    if (postId) {
      await likePost(postId, userId, isDislike);
    } else {
      await likeComment(commentId, userId, isDislike);
    }

    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};

const unlike = async (req, res) => {
  try {
    const { postId, userId, commentId } = req.query;
    if ((!postId && !commentId) || (postId && commentId)) {
      res.status(400).send();
    }

    if (postId) {
      await unlikePost(postId, userId);
    } else {
      await unlikeComment(commentId, userId);
    }

    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};

router.get("/", getLikes);
router.get("/liked", likedByUser);
router.put("/", like);
router.delete("/", unlike);

module.exports = router;
