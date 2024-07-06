const db = require("../../../models/DBContext");

const UPDATE_POST_TITLE = `
UPDATE post 
SET post_title = @post_title, post_updated_time = GETDATE()
WHERE post_id = @post_id;
`;

const UPDATE_POST_CONTENT = `
UPDATE post
SET post_content = @post_content, post_updated_time = GETDATE()
WHERE post_id = @post_id;
`;

const UPDATE_POST_STATUS = `
UPDATE post
SET post_status = @post_status, post_updated_time = GETDATE()
WHERE post_id = @post_id;
`;

const UPDATE_POST = `
UPDATE post
SET post_title = @post_title, post_content = @post_content, post_status = @post_status, post_updated_time = GETDATE()
WHERE post_id = @post_id;
`;

const put = async (req, res) => {
  try {
    const { title, content, post_id, status } = req.body;
    const pool = await db.poolPromise;
    // if only status provided, use the UPDATE_POST_STATUS query
    if (!title && !content && status && post_id) {
      if (
        status !== "PUBLISHED" &&
        status !== "DRAFT" &&
        status !== "DELISTED"
      ) {
        return res.status(400).json({ message: "Invalid post status" });
      }

      const result = await pool
        .request()
        .input("post_id", db.sql.Int, post_id)
        .input("post_status", db.sql.NVarChar, status)
        .query(UPDATE_POST_STATUS);

      if (result.rowsAffected[0] === 0) {
        return res.status(404).send();
      } else {
        return res.status(200).send();
      }
    }

    if (status) {
      if (
        status !== "PUBLISHED" &&
        status !== "DRAFT" &&
        status !== "DELISTED"
      ) {
        return res.status(400).json({ message: "Invalid post status" });
      }
    }

    if (title) {
      if (title === "") {
        return res.status(400).json({ message: "Post title cannot be empty" });
      }
    }

    if (content) {
      if (content === "") {
        return res
          .status(400)
          .json({ message: "Post content cannot be empty" });
      }
    }

    if (isNaN(post_id) || post_id <= 0) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const result = await pool
      .request()
      .input("post_id", db.sql.Int, post_id)
      .input("post_title", db.sql.NVarChar, title)
      .input("post_content", db.sql.NVarChar, content)
      .input("post_status", db.sql.NVarChar, status)
      .query(UPDATE_POST);

    await post.save();

    res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

module.exports = {
  put,
};
