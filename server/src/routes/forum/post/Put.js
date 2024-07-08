const Post = require("../../../models/forum/post/Post");
const PostCategory = require("../../../models/forum/post/PostCategory");
const User = require("../../../models/User");
const PostHistory = require("../../../models/forum/post/PostHistory");

const put = async (req, res) => {
  try {
    let {id, title, content, userId, username, status, tags, category, categoryId} = req.body;

    let msg;

    let post = await Post.findByPk(id);
    if(!post) {
        res.status(404).json({message: "Post not found."});
        return;
    }


    let PostCategoryId;
    if (!category && !categoryId) {
      PostCategoryId = post.PostCategoryId;
    }

    if (categoryId) {
      const cId = await PostCategory.findByPk(categoryId)
      if (!cId) {
        res.status(404).json({message: "Category not found."});
        return;
      }
      PostCategoryId = categoryId;
    }


    if (category) {
      const cName = await PostCategory.findOne({
        where: {
          name: category
        }
      })
      if (!cName) {
        res.status(404).json({message: "Category not found."});
        return;
      }
      if (PostCategoryId) {
        msg = "Category ID and name provided. Using Category ID.";
      } else {
        PostCategoryId = cName.id;
      }
    }

    if(!title) {
        title = post.title;
    }

    if (title === "") {
      res.status(400).json({message: "Post title cannot be empty."});
      return;
    }

    if(!content) {
        content = post.content;
    }

    if (content === "") {
      res.status(400).json({message: "Post content cannot be empty."});
      return;
    }

    let UserId;

    if (!userId && !username) {
      UserId = post.UserId;
      return;
    }

    if (userId) {
      const userExists = await User.findByPk(userId);
      if (!userExists) {
        res.status(404).json({message: "User not found."});
        return;
      }
      UserId = userId;
    }

    let message
    if (username) {
      const userExists = await User.findOne({where: {username}});
      if (!userExists) {
        res.status(404).json({message: "User not found."});
        return;
      }
      if (UserId) {
        message = "User ID and username provided. Using User ID.";
      } else {
        UserId = userExists.id;
      }
    }

    if(!tags) {
      tags = post.tags;
    }

    if (tags && tags.length > 0) {
      for (let tag of tags) {
        if (tag === "") {
          res.status(400).json({message: "Tag cannot be empty."});
          return;
        }
      }
    }

    await post.update({title, content, id, status, PostCategoryId, tags, UserId});
    let PostId = id;
    await PostHistory.create({PostId, title, content, UserId, PostCategoryId, tags, action: "UPDATE"});
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  put,
};
