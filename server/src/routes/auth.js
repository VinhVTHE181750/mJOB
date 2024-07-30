const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const router = require("express").Router();
const Hasher = require("../utils/Hasher");
const Auth = require("../models/user/Auth");
const User = require("../models/user/User");
const { createToken } = require("../utils/JWT");
const cookieParser = require("cookie-parser");
const { sendMailActivateAccount, sendMailOTP } = require("../helper/sendmail");

function generateRandomSixDigitNumber() {
  let randomNumber = Math.floor(Math.random() * 1000000);
  let randomSixDigitNumber = String(randomNumber).padStart(6, "0");
  return randomSixDigitNumber;
}

router.get("/check-user", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const randNumber = generateRandomSixDigitNumber();
      await sendMailOTP(
        user.email,
        randNumber,
        "This is code for change password"
      );
      const auth = await Auth.findOne({ where: { UserId: user.id } });
      auth.code = randNumber;
      await auth.save();
      return res.status(200).json({ message: "User found" });
    } else {
      return res.status(203).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/check-validate-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ where: { email } });
    const auth = await Auth.findOne({ where: { UserId: user.id } });
    if (auth.code === otp) {
      return res.status(200).json({ message: "OTP comfirm!" });
    } else {
      return res.status(203).json({ message: "OTP wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const {
      email,
      password,
      // answerQuestionSecurityQuestion,
      // securityQuestion,
    } = req.body;
    const user = await User.findOne({ where: { email } });
    const auth = await Auth.findOne({ where: { UserId: user.id } });
    const hash = await Hasher.getHash(password, auth.salt);
    if (
      // user.securityQuestion !== securityQuestion 
      // user.answerQuestionSecurityQuestion !== answerQuestionSecurityQuestion
      false
    ) {
      return res
        .status(203)
        .json({ message: "Security Question not correct!" });
    }
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

router.post("/active-account", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const auth = await Auth.findOne({ where: { UserId: user.id } });
    const token = createToken({ id: user.id, role: auth.role });
    auth.isActivated = true;
    await auth.save();
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "strict",
      secure: false,
    });
    return res
      .status(200)
      .json({ message: "Active account successful", token });
  } catch (e) {
    log(e.message, "ERROR", "AUTH");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Updated /register route
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      phone,
      address,
      securityQuestion,
      securityAnswer,
      dateOfBirth,
    } = req.body;
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
    const user = await User.create({
      username,
      email,
      phone,
      securityQuestion,
      answerQuestionSecurityQuestion: securityAnswer,
      address,
      dob: dateOfBirth,
    });
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
    await sendMailActivateAccount(
      email,
      `http://localhost:5173/active-account?email=${email}`
    );
    return res.status(201).json({ message: "Registration successful", token });
  } catch (e) {
    log(e.message, "ERROR", "AUTH");
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
