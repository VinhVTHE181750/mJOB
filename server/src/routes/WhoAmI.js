const express = require("express");
const User = require("../models/user/User");
const router = express.Router();

const whoami = async (req, res) => {
  const userId = req.userId;
  if (userId) {
    const role = req.role;
    const user = await User.findOne({ where: { id: userId } });
    const username = user.username;

    return res.status(200).json({ role, userId, username });
  }
};

router.get("/", whoami);

module.exports = router;
