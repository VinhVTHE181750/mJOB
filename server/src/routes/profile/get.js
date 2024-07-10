const db = require("../../../models/DBContext");

const SELECT_RECENT_POSTS = `
SELECT post_id, post_title, post_content, username, post_updated_time
FROM post JOIN auth ON post.user_id = auth.user_id
ORDER BY post_updated_time DESC;
`;

const SELECT_POST_BY_ID = `
SELECT post_id, post_title, post_content, username, post_updated_time
FROM post JOIN auth ON post.user_id = auth.user_id
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
