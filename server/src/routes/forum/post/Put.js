const Post = require("../../../models/forum/post/Post");

const UPDATE_POST_TITLE = `
UPDATE post 
SET post_title = @post_title, post_updated_time = GETDATE()
WHERE post_id = @post_id;
`;

const updatePost = async (title, content, postId, status) => {
  const post = await Post.update(
    {
      title,
      content,
      status,
    },
    {
      where: {
        id: postId,
      },
    }
  );
  return post;
};

const updatePostHistory = async (postId, title, content) => {
  await PostHistory.create({
    postId,
    title,
    content,
  });
};

const put = async (req, res) => {
  try {
    const { title, content, postId, status } = req.body;
    if (status !== "PUBLISHED" && status !== "DRAFT" && status !== "DELISTED") {
      res.status(400).json({ message: "Invalid post status." });
      return;
    }

    if (title === "") {
      res.status(400).json({ message: "Post title cannot be empty." });
      return;
    }

    if (content === "") {
      res.status(400).json({ message: "Post content cannot be empty." });
      return;
    }

    if (isNaN(postId) || postId <= 0) {
      res.status(400).json({ message: "Invalid post id." });
      return;
    }

    await updatePost(title, content, postId, status);
    await updatePostHistory(postId, title, content);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  put,
};
