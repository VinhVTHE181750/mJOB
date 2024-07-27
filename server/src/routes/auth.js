const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const router = require("express").Router();
const Hasher = require("../utils/Hasher");
const Auth = require("../models/user/Auth");
const User = require("../models/user/User");
const { createToken } = require("../utils/JWT");
const cookieParser = require("cookie-parser");

router.get("/check-user", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(200).json({ message: "User found" });
    } else {
      return res.status(203).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const auth = await Auth.findOne({ where: { UserId: user.id } });
    const hash = await Hasher.getHash(password, auth.salt);
    if (user) {
      auth.hash = hash;
      await auth.save();
      return res.status(200).json({ message: "Change password successfully" });
    } else {
      return res.status(203).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// Updated /login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const auth = await Auth.findOne({ where: { UserId: user.id } });
    const hash = await Hasher.getHash(password, auth.salt);
    const isValidPassword = hash === auth.hash;
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = createToken({ id: user.id, role: auth.role });
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "strict",
      secure: false,
    });
    return res.json({ message: "Login successful", token });
  } catch (e) {
    log(e.message, "ERROR", "AUTH");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ "message:": "Logout successfully!" });
  } catch (e) {
    log(e.message, "ERROR", "AUTH");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Updated /register route
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
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
    const user = await User.create({ username, email, phone });
    if (!user) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    const auth = await Auth.create({ UserId: user.id, hash, salt });
    if (!auth) {
      return res.status(400).json({ error: "Authentication failed" });
    }

    const token = createToken({ id: user.id, role: auth.role });

    // NOTE: httpOnly is set to false for development purposes
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
    });
    return res.json({ message: "Registration successful", token });
  } catch (e) {
    log(e.message, "ERROR", "AUTH");
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
