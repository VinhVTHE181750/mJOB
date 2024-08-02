const express = require("express");
const db = require("../models/DBContext");

const router = express.Router();

const SELECT_POSTS_CONTENT = "SELECT TOP 3 p.post_id, p.post_title, p.post_content, u.username FROM post p JOIN auth u ON p.user_id = u.user_id";

router.get("/", async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request().query(SELECT_POSTS_CONTENT);
    res.json(result.recordset);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

module.exports = router;