const express = require("express");
const User = require("../../models/user/User");
const Auth = require("../../models/user/Auth");
const Post = require("../../models/forum/post/Post");

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

router.delete('/delete-user/:id', async (req, res) => {
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

  router.get('/posts-manage', async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{
          model: User,
          attributes: ['username']
        }]
      });
      res.json(posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  router.delete('/delete-post/:id', async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      await post.destroy();
      res.json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  router.get('/posts-count', async (req, res) => {
    try {
      const count = await Post.count();
      return res.status(200).json(count);
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err });
    }
  });

  module.exports = router;