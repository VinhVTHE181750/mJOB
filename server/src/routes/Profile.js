const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../utils/JWT");

const { getUser } = require("./user/User");
const { submitWorkExp } = require("./user/WorkExperience");
const User = require("../models/user/User");
const Auth = require("../models/user/Auth");
const Hasher = require("../utils/Hasher");
const EmployerProfile = require("../models/user/EmployerProfile");

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

  const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  router.post('/change-password', async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
  
  
    try {
      const auth = await Auth.findOne({ where: { UserId: userId } });
      if (!auth) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const hash = await Hasher.getHash(currentPassword, auth.salt);
      const isValidPassword = hash === auth.hash;
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid current password' });
      }
  
      const newSalt = await Hasher.generateSalt();
      const newHash = await Hasher.getHash(newPassword, newSalt);
      await auth.update({ hash: newHash, salt: newSalt });
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/employer/:id', async (req, res) => {
    try {
      const post = await EmployerProfile.findByPk(req.params.id);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: 'Employer not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Employer', error });
    }
  });

  router.put('/edit-employer/:id', async (req, res) => {
    const { id } = req.params;
    const { name, industry, description, address, phone, email, website } = req.body;
  
    try {
      const employer = await EmployerProfile.findByPk(id);
  
      if (employer) {
        employer.name = name;
        employer.industry = industry;
        employer.description = description;
        employer.address = address;
        employer.phone = phone;
        employer.email = email;
        employer.website = website;
        
        await employer.save();
        res.status(200).json(employer);
      } else {
        res.status(404).json({ error: 'Employer not found' });
      }
    } catch (error) {
      console.error('Error updating employer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = router;