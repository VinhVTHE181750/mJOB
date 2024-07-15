const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../utils/JWT");

const { getUser } = require("./user/User");
const { submitWorkExp } = require("./user/WorkExperience");
<<<<<<< Updated upstream

router.get("/:id", getUser);
router.post("/work-experience", submitWorkExp);
=======
const User = require("../models/user/User");

// router.get("/:id", getUser);
router.post("/work-experience", submitWorkExp);
router.get('/:id', async (req, res) => {
    try {
      const post = await User.findByPk(req.params.id);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post', error });
    }
  });

  router.get('/edit/:id', async (req, res) => {
    try {
      const post = await User.findByPk(req.params.id);
      if (post) {        
        res.json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post', error });
    }
  });

  router.put('/edit-profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user profile fields
      user.username = req.body.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.dob = req.body.dob;
      user.address = req.body.address;
      user.citizenId = req.body.citizenId;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.bio = req.body.bio;
  
      await user.save();
      res.status(200).json(user); // Respond with updated user object
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ message: 'Error updating profile' });
    }
  });

>>>>>>> Stashed changes

module.exports = router;
