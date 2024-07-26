const express = require("express");
const User = require("../../models/user/User");
const Auth = require("../../models/user/Auth");
const router = express.Router();


router.get('/users-role', async (req, res) => {
    try {
      const users = await User.findAll({
        include: [{
          model: Auth,
          attributes: ['role']
        }]
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

router.delete('/delete/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      await user.destroy();
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
 
  module.exports = router;