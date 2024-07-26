const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const router = require("express").Router();
const Hasher = require("../utils/Hasher");
const Auth = require("../models/Auth");
const User = require("../models/User");
const { createToken } = require("../utils/JWT");
const cookieParser = require("cookie-parser");

// Updated /login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const auth = await Auth.findOne({ where: { userId: user.id } });
    // const auth = await Auth.findOne({ where: { username: username } });

    const hash = await Hasher.getHash(password, auth.salt);
    const isValidPassword = hash === auth.hash;
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = createToken({ id: user.user_id, role: auth.role });
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    return res.json({ message: "Login successful", token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Updated /register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // if already existed
    const userExisted = await User.findOne({ where: { username } });
    if (userExisted) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const salt = await Hasher.generateSalt();
    const hash = await Hasher.getHash(password, salt);

    // validate user: existed? invalid username? weak password?
    const user = await User.create({ username });
    if (!user) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    const auth = await Auth.create({ UserId: user.id, hash, salt });
    if (!auth) {
      return res.status(400).json({ error: "Authentication failed" });
    }

    const token = createToken({ id: user.id, role: auth.role });
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    return res.json({ message: "Registration successful", token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
