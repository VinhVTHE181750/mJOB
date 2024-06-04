const express = require("express");
const db = require("../models/DBContext");

const router = express.Router();

const SELECT_POSTS_BY_DATE_DESC =
  "SELECT post_id, post_title, post_content, Posts.user_id AS user_id, Users.username AS author, post_created_date FROM Posts JOIN Users ON Posts.user_id = Users.user_id ORDER BY post_created_date DESC";
const SELECT_POST_BY_ID =
  "SELECT post_id, post_title, post_content, Posts.user_id AS user_id, Users.username AS author, post_created_date FROM Posts JOIN Users ON Posts.user_id = Users.user_id WHERE Posts.post_id = @id";
const INSERT_POST =
  "INSERT INTO Posts (post_title, post_content, user_id, post_status) VALUES (@post_title, @post_content, @user_id, 'published')";

router.get("/:id", async (req, res) => {
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
});

router.get("/", async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request().query(SELECT_POSTS_BY_DATE_DESC);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("post_title", db.sql.NVarChar, title)
      .input("post_content", db.sql.NVarChar, content)
      .input("user_id", db.sql.Int, user_id)
      .query(INSERT_POST);
    res.status(201).json({ message: "Post inserted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

module.exports = router;