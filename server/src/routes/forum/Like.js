const express = require("express");
const router = express.Router();
const db = require("../../models/DBContext");

const COUNT_LIKES_BY_POST_ID = `
SELECT 
    SUM(CASE WHEN isDislike = 0 THEN 1 ELSE 0 END) AS likes,
    SUM(CASE WHEN isDislike = 1 THEN 1 ELSE 0 END) AS dislikes
FROM [post_like]
WHERE post_id = @postId;
`;

const COUNT_LIKES_BY_COMMENT_ID = `
SELECT 
    SUM(CASE WHEN isDislike = 0 THEN 1 ELSE 0 END) AS likes,
    SUM(CASE WHEN isDislike = 1 THEN 1 ELSE 0 END) AS dislikes
FROM [comment_like]
WHERE comment_id = @commentId;
`;

const POST_LIKED_BY_USER = `
SELECT *
FROM [post_like]
WHERE post_id = @postId AND user_id = @userId;
`;

const COMMENT_LIKED_BY_USER = `
SELECT COUNT(*) AS liked
FROM [comment_like]
WHERE comment_id = @commentId AND user_id = @userId;
`;

// post_id int, user_id int, liked boolean
const LIKE_POST = `
INSERT INTO post_like (post_id, user_id, isDislike)
VALUES (@postId, @userId, @liked);
`;

const UPDATE_POST_LIKE = `
UPDATE post_like
SET isDislike = @liked
WHERE post_id = @postId AND user_id = @userId;
`;

const LIKE_COMMENT = `
INSERT INTO comment_like (comment_id, user_id, isDislike )
VALUES (@commentId, @userId, @liked);
`;

const UPDATE_COMMENT_LIKE = `
UPDATE comment_like
SET isDislike = @liked
WHERE comment_id = @commentId AND user_id = @userId;
`;

const getLikesByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("postId", db.sql.Int, postId)
      .query(COUNT_LIKES_BY_POST_ID);
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    // res.status(200).json(0);
    res.status(500).send();
  }
};

const getLikesByCommentId = async (req, res) => {
  try {
    const { commentId } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("commentId", db.sql.Int, commentId)
      .query(COUNT_LIKES_BY_COMMENT_ID);
    res.status(200).json(result.recordset[0].likes);
  } catch (err) {
    res.status(500).send();
  }
};

const postLikedByUser = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("postId", db.sql.Int, postId)
      .input("userId", db.sql.Int, userId)
      .query(POST_LIKED_BY_USER);
    if (result.recordset.length === 0) {
      res.status(404).send();
    } else res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};

const commentLikedByUser = async (req, res) => {
  try {
    const { commentId, userId } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("commentId", db.sql.Int, commentId)
      .input("userId", db.sql.Int, userId)
      .query(COMMENT_LIKED_BY_USER);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send();
  }
};

const likePost = async (req, res) => {
  try {
    const { postId, userId, isDislike } = req.body;
    let query;
    const pool = await db.poolPromise;
    const preResult = await pool
      .request()
      .input("postId", db.sql.Int, postId)
      .input("userId", db.sql.Int, userId)
      .query(POST_LIKED_BY_USER);
    if (preResult.recordset[0].liked) {
      query = UPDATE_POST_LIKE;
    } else {
      query = LIKE_POST;
    }
    const result = await pool
      .request()
      .input("postId", db.sql.Int, postId)
      .input("userId", db.sql.Int, userId)
      .input("liked", db.sql.Bit, isDislike)
      .query(query);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};

const likeComment = async (req, res) => {
  try {
    const { commentId, userId, isDislike } = req.body;
    let query;
    const pool = await db.poolPromise;

    const preResult = await pool
      .request()
      .input("commentId", db.sql.Int, commentId)
      .input("userId", db.sql.Int, userId)
      .query(COMMENT_LIKED_BY_USER);
    console.log(2);
    if (preResult.recordset[0].liked) {
      query = UPDATE_COMMENT_LIKE;
    } else {
      query = LIKE_COMMENT;
    }
    const result = await pool
      .request()
      .input("commentId", db.sql.Int, commentId)
      .input("userId", db.sql.Int, commentId)
      .input("liked", db.sql.Bit, isDislike)
      .query(query);

    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send();
  }
};

router.get("/post/:postId", getLikesByPostId);
router.get("/comment/:commentId/", getLikesByCommentId);
router.get("/post/liked/:postId/:userId", postLikedByUser);
router.get("/comment/liked/:commentId/:userId", commentLikedByUser);
router.put("/post", likePost);
router.put("/comment", likeComment);

module.exports = router;
