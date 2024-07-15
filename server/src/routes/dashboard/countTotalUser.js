const express = require("express");
const router = express.Router();

// Set SQL query to count users
// const SELECT_COUNT_USER = "SELECT COUNT(*) AS userCount FROM auth";
const User = require("../../models/user/User");

// GET user count
router.get("/", async (req, res) => {
  try {
    const count = await User.count();
    // const result = await pool.request().query(SELECT_COUNT_USER);
    // res.json(result.recordset[0].userCount);
    return res.status(200).json(count);
  } catch (err) {
    return res.status(500).json({ message: "Error occurred", error: err });
  }
});

module.exports = router;
