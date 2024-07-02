const db = require("../../../models/DBContext");

const SELECT_RECENT_POSTS = `
SELECT post_id, post_title, post_content, post.user_id, post_view_count, username, post_updated_time
FROM post JOIN [user] ON post.user_id = [user].user_id
ORDER BY post_updated_time DESC;
`;

const SELECT_POST_BY_ID = `
SELECT post_id, post_title, post_content, post_view_count, username, post.user_id, post_updated_time
FROM post JOIN [user] ON post.user_id = [user].user_id
WHERE post_id = @id;
`;

const ADD_VIEW_COUNT = `
UPDATE post
SET post_view_count = post_view_count + 1
WHERE post_id = @id;
`;

const getAllPosts = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request().query(SELECT_RECENT_POSTS);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await db.poolPromise;
    await pool.request().input("id", db.sql.Int, id).query(ADD_VIEW_COUNT);
    const result = await pool
      .request()
      .input("id", db.sql.Int, id)
      .query(SELECT_POST_BY_ID);

    if (result.recordset.length === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
};
