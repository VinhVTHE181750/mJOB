const db = require("../../../models/DBContext");

const SELECT_COMMENTS_BY_POST_ID = `
SELECT comment_id, comment_content, comment.user_id, username, comment_updated_time
FROM comment JOIN post ON comment.id = post.id JOIN [user] ON comment.user_id = [user].user_id
WHERE post.id = @id;
`;

const SELECT_COMMENT_BY_ID = `
SELECT comment_id, comment_content, comment.user_id, username, comment_updated_time
FROM comment JOIN post ON comment.id = post.id JOIN [user] ON comment.user_id = [user].user_id
WHERE comment_id = @id;
`;

const COUNT_COMMENTS_BY_POST_ID = `
SELECT COUNT(comment_id) AS comment_count
FROM comment
WHERE id = @id;
`;

const getComments = async (req, res) => {
  try {
    const { postId, id } = req.query;
    const pool = await db.poolPromise;

    // If none or both query parameters are provided, return 400
    if ((!postId && !id) || (postId && id)) {
      return res.status(400).json({ message: "Provide either postId or id" });
    }

    // If postId is provided, return all comments for that post
    if (postId) {
      const result = await pool
        .request()
        .input("id", db.sql.Int, postId)
        .query(SELECT_COMMENTS_BY_POST_ID);
      // if length == 0 return 404
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No comments found" });
      } else return res.status(200).json(result.recordset);
    }

    // If id is provided, return the comment with that id
    if (id) {
      const result = await pool
        .request()
        .input("id", db.sql.Int, id)
        .query(SELECT_COMMENT_BY_ID);
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No comment found" });
      } else return res.status(200).json(result.recordset);
    }
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

const getCommentCount = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("id", db.sql.Int, id)
      .query(COUNT_COMMENTS_BY_POST_ID);
    res.status(200).json(result.recordset[0].comment_count);
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

module.exports = {
  getComments,
  getCommentCount,
};
