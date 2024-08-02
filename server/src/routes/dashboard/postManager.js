const express = require("express");
const User = require("../../models/user/User");
const Post = require("../../models/forum/post/Post");
const router = express.Router();

router.get('/', async (req, res) => {
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

router.get('/pending-posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        status: "PUBLISHED",
        isAutoVerified: false,
        isVerified: false
      },
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

router.put('/activate/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    post.status = "PUBLISHED";
    post.isVerified = true;
    post.isAutoVerified = true;
    await post.save();
    res.json({ success: true, message: "Post updated successfully" });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.put('/reject/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    post.status = "DELISTED";
    post.isVerified = false;
    post.isAutoVerified = false;
    await post.save();
    res.json({ success: true, message: "Post updated successfully" });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    await post.destroy();
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;