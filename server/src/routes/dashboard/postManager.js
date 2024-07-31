const express = require("express");
const User = require("../../models/user/User");
const Post = require("../../models/forum/post/Post");
const router = express.Router();

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

module.exports = router;
