// This is a template for creating a new route.
const express = require("express");
const Post = require("../models/forum/post/Post");
const router = express.Router();

// GET without parameter
router.get("/", async (req, res) => {
  res.status(200).send("Hello, world! 123");
});

async function createPosts(amount, rest) {
  let { title, content, UserId, status, PostCategoryId, tags } = rest;
  let createdPosts = [];
  for (let i = 0; i < amount; i++) {
    let post = Post.create({
      title: title || "This is a post",
      content: content || "This is the content of the post",
      UserId: UserId || 1,
      status: status || "PUBLISHED",
      PostCategoryId: PostCategoryId || 1,
      tags: tags || "tag1, tag2, tag3",
    });
    createdPosts.push(post);
  }
  const resolvedPosts = await Promise.all(createdPosts);
  return {
    message: `Post(s) x${amount} created`,
    supportedFields: "title, content, UserId, status, PostCategoryId, tags",
    posts: resolvedPosts,
  };
}

async function createComments(amount, rest) {
  let { content, PostId, UserId } = rest;
  let createdComments = [];
  for (let i = 0; i < amount; i++) {
    let comment = await Comment.create({
      content: content || "This is a comment",
      PostId: PostId || 1,
      UserId: UserId || 1,
    });
    createdComments.push(comment);
  }
  const resolvedComments = await Promise.all(createdComments);
  return {
    message: `Comment(s) x${amount} created`,
    supportedFields: "content, PostId, UserId",
    comments: resolvedComments,
  };
}

router.post("/generate", async (req, res) => {
  const { data, amount, ...rest } = req.body;

  const available = ["posts", "comments"];

  if (!data || !available.includes(data)) {
    return res
      .status(400)
      .json({
        message: "Invalid data type",
        available
      });
  }

  try {
    switch (data) {
      case "posts": {
        const result = await createPosts(amount, rest);
        return res.status(200).json(result);
      }
      case "comments": {
        const result = await createComments(amount, rest);
        return res.status(200).json(result);
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while creating sample " + data });
  }
});

module.exports = router;
