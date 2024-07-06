const { pool } = require("mssql");
const db = require("../../../models/DBContext");

const INSERT_POST = `
INSERT INTO post (post_title, post_content, user_id, post_status) 
OUTPUT INSERTED.post_id
VALUES (@post_title, @post_content, @user_id, @post_status);
`;

const INSERT_POST_HISTORY = `
INSERT INTO post_history (post_id, post_title, post_content)
VALUES (@post_id, @post_title, @post_content);
`;

const post = async (req, res) => {
  try {
    const { title, content, user_id, post_status } = req.body;
    // if post_status is not in PUBLSIHED, DRAFT, DELISTED, return 400
    if (
      post_status !== "PUBLISHED" &&
      post_status !== "DRAFT" &&
      post_status !== "DELISTED"
    ) {
      res.status(400).json({ message: "Invalid post status." });
      return;
    }
    // if post_title is empty, return 400
    if (title === "") {
      res.status(400).json({ message: "Post title cannot be empty." });
      return;
    }

    // if post_content is empty, return 400
    if (content === "") {
      res.status(400).json({ message: "Post content cannot be empty." });
      return;
    }

    // if user_id is not a number or less than 0, return 400
    if (isNaN(user_id) || user_id <= 0) {
      res.status(400).json({ message: "Invalid user id." });
      return;
    }

    const pool = await db.poolPromise;
    // First query: Insert into post
    const result = await pool
      .request()
      .input("post_title", db.sql.NVarChar, title)
      .input("post_content", db.sql.NVarChar, content)
      .input("user_id", db.sql.Int, user_id)
      .input("post_status", db.sql.NVarChar, post_status)
      .query(INSERT_POST);
    inserted = true;

    const post_id = result.recordset[0].post_id;

    await pool // Second query: Insert into post_history
      .request()
      .input("post_id", db.sql.Int, post_id)
      .input("post_title", db.sql.NVarChar, title)
      .input("post_content", db.sql.NVarChar, content)
      .query(INSERT_POST_HISTORY);
    logged = true;
  } catch (err) {
    console.log(err);
  }

  // Second query: Insert into post_history
  if (!inserted) {
    // INSERT to error log: post cannot be created
    res.status(500).json({ message: "Error occurred while creating post." });
    return;
  } else {
    if (!logged) {
      /* INSERT to error log: post cannot be logged into history*/
      res.status(201).json({ message: "Post created but not logged." });
    } else {
      res.status(201).send();
    }
    return;
  }
};

module.exports = {
  post,
};
