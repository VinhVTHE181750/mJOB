const express = require("express");
const db = require("../../models/DBContext");

const router = express.Router();

// Set SQL query to count users
const SELECT_COUNT_ACTIVE = "SELECT (activity_date as D, max_active_user as A) FROM daily_activity";

// GET user count
router.get("/", async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request().query(SELECT_COUNT_ACTIVE);
    res.json(result.recordset[0].userCount);
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

module.exports = router;
