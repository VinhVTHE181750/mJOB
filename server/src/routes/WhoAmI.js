const express = require("express");
const User = require("../models/user/User");
const Auth = require("../models/user/Auth");
const router = express.Router();

const whoami = async (req, res) => {
  const userId = req.userId;
  if (userId) {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      const username = user.username;
      const auth = await Auth.findOne({ where: { UserId: userId } });
      const role = auth ? auth.role : "USER"; // Default to "USER" if no auth found
      return res.status(200).json({ role, userId, username });
    }
    // User ID is present but no user found, treat as guest
    return res.status(200).json({ role: "GUEST", userId: -1, username: "Guest" });
  } else {
    // No userId present, treat as guest
    return res.status(200).json({ role: "GUEST", userId: -1, username: "Guest" });
  }
};

router.get("/", whoami);

module.exports = router;