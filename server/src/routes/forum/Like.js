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
SELECT *
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

const UNLIKE_POST = `
DELETE FROM post_like
WHERE post_id = @postId AND user_id = @userId;
`;

const UNLIKE_COMMENT = `
DELETE FROM comment_like
WHERE comment_id = @commentId AND user_id = @userId;
`;

const getLikes = async (req, res) => {
  try {
    const { postId, commentId } = req.query;
    // if both undefined or both defined, return 400
    if ((!postId && !commentId) || (postId && commentId)) {
      res.status(400).send();
    }

    const pool = await db.poolPromise;
    if (postId) {
      const result = await pool
        .request()
        .input("postId", db.sql.Int, postId)
        .query(COUNT_LIKES_BY_POST_ID);
      res.status(200).json(result.recordset);
    } else {
      const result = await pool
        .request()
        .input("commentId", db.sql.Int, commentId)
        .query(COUNT_LIKES_BY_COMMENT_ID);
      res.status(200).json(result.recordset);
    }
  } catch (err) {
    // res.status(200).json(0);
    res.status(500).send();
  }
};

const likedByUser = async (req, res) => {
  try {
    const { postId, userId, commentId } = req.query;

    // add validation here

    if ((!postId && !commentId) || (postId && commentId)) {
      res.status(400).send();
    }

    const pool = await db.poolPromise;
    if (postId) {
      const result = await pool
        .request()
        .input("postId", db.sql.Int, postId)
        .input("userId", db.sql.Int, userId)
        .query(POST_LIKED_BY_USER);
      if (result.recordset.length === 0) {
        res.status(404).send();
      } else res.status(200).json(result.recordset);
    } else {
      const result = await pool
        .request()
        .input("commentId", db.sql.Int, commentId)
        .input("userId", db.sql.Int, userId)
        .query(COMMENT_LIKED_BY_USER);
      if (result.recordset.length === 0) {
        res.status(404).send();
      } else res.status(200).json(result.recordset);
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
    const pool = await db.poolPromise;
    if (postId) {
      // if postId is defined, like a post
      const isLiked = await pool
        .request()
        .input("postId", db.sql.Int, postId)
        .input("userId", db.sql.Int, userId)
        .query(POST_LIKED_BY_USER);
      if (isLiked.recordset.length === 0) {
        // if user has not liked the post
        const result = await pool
          .request()
          .input("postId", db.sql.Int, postId)
          .input("userId", db.sql.Int, userId)
          .input("liked", db.sql.Bit, isDislike)
          .query(LIKE_POST);
        res.status(200).send();
      } else {
        // if user has liked the post, use the UPDATE_POST_LIKE query
        const result = await pool
          .request()
          .input("postId", db.sql.Int, postId)
          .input("userId", db.sql.Int, userId)
          .input("liked", db.sql.Bit, isDislike)
          .query(UPDATE_POST_LIKE);
        res.status(200).send();
      }
    } else {
      // if commentId is defined, like a comment
      const isLiked = await pool
        .request()
        .input("commentId", db.sql.Int, commentId)
        .input("userId", db.sql.Int, userId)
        .query(COMMENT_LIKED_BY_USER);
      if (isLiked.recordset.length === 0) {
        // if user has not liked the comment
        const result = await pool
          .request()
          .input("commentId", db.sql.Int, commentId)
          .input("userId", db.sql.Int, userId)
          .input("liked", db.sql.Bit, isDislike)
          .query(LIKE_COMMENT);
        res.status(200).send();
      } else {
        // if user has liked the comment
        const result = await pool
          .request()
          .input("commentId", db.sql.Int, commentId)
          .input("userId", db.sql.Int, userId)
          .input("liked", db.sql.Bit, isDislike)
          .query(UPDATE_COMMENT_LIKE);
        res.status(200).send();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const unlike = async (req, res) => {
  try {
    const { postId, userId, commentId } = req.query;
    if ((!postId && !commentId) || (postId && commentId)) {
      res.status(400).send();
    }
    const pool = await db.poolPromise;
    const isLiked = await pool
      .request()
      .input("postId", db.sql.Int, postId)
      .input("userId", db.sql.Int, userId)
      .query(POST_LIKED_BY_USER);
    if (isLiked.recordset.length === 0) {
      res.status(404).send();
    } else {
      if (postId) {
        const result = await pool
          .request()
          .input("postId", db.sql.Int, postId)
          .input("userId", db.sql.Int, userId)
          .query(UNLIKE_POST);
        res.status(200).send();
      } else {
        const result = await pool
          .request()
          .input("commentId", db.sql.Int, commentId)
          .input("userId", db.sql.Int, userId)
          .query(UNLIKE_COMMENT);
        res.status(200).send();
      }
    }
  } catch (err) {
    res.status(500).send();
  }
};

router.get("/", getLikes);
router.get("/liked", likedByUser);
router.put("/", like);
router.delete("/", unlike);

module.exports = router;
