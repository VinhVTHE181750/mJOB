const db = require("../../../models/DBContext");

const SELECT_RECENT_POSTS = `
SELECT post_id, post_title, post_content, user_id, post_view_count, post_updated_time, post_created_time
FROM post
WHERE post_status = 'PUBLISHED'
ORDER BY post_updated_time DESC;
`;

const SELECT_RECENT_POSTS_COMPACT = `
SELECT post_id, post_title
FROM post
WHERE post_status = 'PUBLISHED'
ORDER BY post_updated_time DESC;
`;

const SELECT_RECENT_POSTS_FULL = `
SELECT post_id, post_title, post_content, post.user_id, username, post_view_count, post_updated_time, post_created_time, post_status
FROM post JOIN [user] ON post.user_id = [user].user_id
WHERE post_status = 'PUBLISHED'
ORDER BY post_updated_time DESC;
`;

const SELECT_POSTS_OF_USER = `
SELECT post_id, post_title, post_content, user_id, post_view_count, post_updated_time, post_created_time, post_status
FROM post
WHERE user_id = @user_id
ORDER BY post_updated_time DESC;
`;

const SELECT_POST_BY_ID = `
SELECT post_id, post_title, post_content, user_id, post_view_count, post_updated_time, post_created_time, post_status
FROM post 
WHERE post_id = @id;
`;

const ADD_VIEW_COUNT = `
UPDATE post
SET post_view_count = post_view_count + 1
WHERE post_id = @id;
`;

const GET_VIEW_COUNT = `
SELECT post_view_count
FROM post
WHERE post_id = @id;
`;

const getAllPosts = async (req, res) => {
  try {
    const { mode } = req.query;
    const pool = await db.poolPromise;
    if (mode === "compact") {
      const result = await pool.request().query(SELECT_RECENT_POSTS_COMPACT);
      res.json(result.recordset);
      return;
    } else if (mode === "full") {
      const result = await pool.request().query(SELECT_RECENT_POSTS_FULL);
      res.json(result.recordset);
      return;
    }
    const result = await pool.request().query(SELECT_RECENT_POSTS);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send();
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

    if (!post) {
      res.status(404).send();
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

const getPostOfUser = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("user_id", db.sql.Int, id)
      .query(SELECT_POSTS_OF_USER);

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

const getPostViewById = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("id", db.sql.Int, id)
      .query(GET_VIEW_COUNT);

    res.json(result.recordset[0].post_view_count);
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostOfUser,
  getPostViewById,
};
