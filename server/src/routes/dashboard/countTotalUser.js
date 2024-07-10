const express = require("express");
const db = require("../../models/DBContext");

const router = express.Router();

// Set SQL query to count users
// const SELECT_COUNT_USER = "SELECT COUNT(*) AS userCount FROM auth";
const User = require("../../models/User");

// GET user count
router.get("/", async (req, res) => {
  try {
    const pool = await db.poolPromise;
    // const result = await pool.request().query(SELECT_COUNT_USER);
    // res.json(result.recordset[0].userCount);
    res.json(await User.count());
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

module.exports = router;
