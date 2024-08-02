const User = require("../../models/user/User");
const { log } = require("../../utils/Logger");

// GET all profiles
const getAllUsers = async (req, res) => {
  log("Fetching all users", "INFO", "User")
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).send("Error fetching all users");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Error fetching profile");
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Error updating profile");
  }
};

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
};