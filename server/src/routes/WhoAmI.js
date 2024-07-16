const express = require("express");
const User = require("../models/user/User");
const Auth = require("../models/user/Auth");
const router = express.Router();

const whoami = async (req, res) => {
  const userId = req.userId;
  if (userId) {
    const user = await User.findOne({ where: { id: userId } });
    const username = user.username;
    const auth = await Auth.findOne({ where: { UserId: userId } });
    const role = auth.role;
    return res.status(200).json({ role, userId, username });
  } else {
    return res.status(200).json({ role: "GUEST", userId: -1, username: "Guest" });
  }
};

router.get("/", whoami);

module.exports = router;
