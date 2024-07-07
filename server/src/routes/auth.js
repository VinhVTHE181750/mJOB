const express = require("express");
const User = require("../models/User");
const Auth = require("../models/Auth");
const Hasher = require("../utils/Hasher");
const router = express.Router();

// /register POST
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await Hasher.generateSalt();
    const hash = await Hasher.getHash(password, salt);

    const user = await User.create({ username });
    await Auth.create({ UserId: user.id, hash, salt });

    // Store the user ID in the session
    req.session.userId = user.id;

    res.json({ message: "Registration successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// /login POST
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

    // Store the user ID in the session
    req.session.userId = user.id;
    res.json({ message: "Login successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// /request-reset-password POST
router.post("/request-reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const message = "If the email is registered, a reset code will be sent";
      return res.status(200).json({ message });
    }

    const code = Math.floor(100000 + Math.random() * 900000); // generate a 6-digit code
    console.log(`Reset code for ${email}: ${code}`);

    await Auth.update({ resetCode: code, resetCodeExpires: Date.now() + 15*60*1000 }, { where: { UserId: user.id } });

    res.status(200).json({ message: "Reset code has been sent" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// /reset-password POST
router.post("/reset-password", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or code" });
    }

    const auth = await Auth.findOne({ where: { UserId: user.id } });
    if (auth.resetCode !== code || Date.now() > auth.resetCodeExpires) {
      return res.status(400).json({ error: "Invalid email or code" });
    }

    const newSalt = await Hasher.generateSalt();
    const newHash = await Hasher.getHash(newPassword, newSalt);

    await Auth.update({ hash: newHash, salt: newSalt, resetCode: null, resetCodeExpires: null }, { where: { UserId: user.id } });

    res.json({ message: "Password reset successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
