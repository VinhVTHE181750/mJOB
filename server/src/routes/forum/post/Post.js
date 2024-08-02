const User = require("../../../models/user/User");
const PostCategory = require("../../../models/forum/post/PostCategory");
const Post = require("../../../models/forum/post/Post");
const PostHistory = require("../../../models/forum/post/PostHistory");
const { log } = require("../../../utils/Logger");
const { getIo } = require("../../../../io");
const CategoryMetric = require("../../../models/forum/metric/CategoryMetric");
const ForumMetric = require("../../../models/forum/metric/ForumMetric");
const PostTag = require("../../../models/forum/post/PostTag");
const TagMetric = require("../../../models/forum/metric/TagMetric");
const { calcRelevance } = require("../../../utils/OpenAI");

const post = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    // console.log(req.body);
    let { title, content, status, category, tags, isAutoVerified } = req.body;
    let msg;
    let PostCategoryId;

    // if status is not PUBLISHED or DRAFT, return 400
    if (status !== "PUBLISHED" && status !== "DRAFT") {
      return res.status(400).json({ message: "Post can only be created as PUBLISHED or DRAFT." });
    }
    let action = status === "PUBLISHED" ? "PUBLISH" : "DRAFT";

    if (!category) {
      res.status(400).json({ message: "Category must be provided." });
      return;
    }
    // if (categoryId) {
    //   const cId = await PostCategory.findByPk(categoryId);
    //   if (!cId) {
    //     res.status(404).json({ message: "Category not found." });
    //     return;
    //   }
    //   PostCategoryId = categoryId;
    // }

    if (category) {
      const cName = await PostCategory.findOne({
        where: {
          name: category,
        },
      });
      if (!cName) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      if (PostCategoryId) {
        msg = "Category ID and name provided. Using Category ID.";
      } else {
        PostCategoryId = cName.id;
      }
    }
    if (!title || title === "") {
      res.status(400).json({ message: "Post title cannot be empty." });
      return;
    }

    if (!content || content === "") {
      res.status(400).json({ message: "Post content cannot be empty." });
      return;
    }

    if (tags === "") {
      tags = undefined;
    }

    if (tags && tags.length > 0) {
      for (let tag of tags) {
        if (tag === "") {
          res.status(400).json({ message: "Tag cannot be empty." });
          return;
        }
      }
    }

    const post = await Post.create({
      title: title,
      content: content,
      UserId: userId,
      status: status,
      isAutoVerified,
      PostCategoryId,
      tags: tags,
    });
    await PostHistory.create({
      title: post.title,
      content: post.content,
      tags: post.tags,
      action: action,
      status: post.status,
      PostCategoryId: post.PostCategoryId,
      UserId: post.UserId,
      PostId: post.id,
    });

    // add 1 to today category metric
    const todayCategoryMetric = await CategoryMetric.findOne({
      where: {
        day: new Date(),
        PostCategoryId,
      },
    });

    if (todayCategoryMetric) {
      todayCategoryMetric.uses += 1;
      await todayCategoryMetric.save();
    } else {
      await CategoryMetric.create({
        day: new Date().toISOString().split("T")[0],
        uses: 1,
        PostCategoryId,
      });
    }

    const forumMetric = await ForumMetric.findOne({
      where: {
        UserId: userId,
        day: new Date().toISOString().split("T")[0],
      },
    });

    if (forumMetric) {
      forumMetric.postCreated += 1;
      await forumMetric.save();
    } else {
      await ForumMetric.create({
        UserId: userId,
        day: new Date().toISOString().split("T")[0],
        postCreated: 1,
      });
    }

    // for each tag, create a PostTag if it doesn't exist, then add 1 to its metric
    // first, anazlyze the tags
    const pTags = tags.split(",");

    pTags.forEach(async (tag) => {
      const t = await PostTag.findOne({
        where: {
          name: tag,
        },
      });

      if (!t) {
        const tempTag = await PostTag.create({
          name: tag,
        });

        await TagMetric.create({
          day: new Date().toISOString().split("T")[0],
          PostTagId: tempTag.id,
          uses: 1,
        });
      } else {
        const tagMetric = await TagMetric.findOne({
          where: {
            day: new Date().toISOString().split("T")[0],
            PostTagId: t.id,
          },
        });
        if (!tagMetric) {
          await TagMetric.create({
            day: new Date().toISOString().split("T")[0],
            PostTagId: t.id,
            uses: 1,
          });
        } else {
          tagMetric.uses = tagMetric.uses + 1;
          await tagMetric.save();
        }
      }
    });
    getIo().emit("forum/posts");
    res.status(201).send({ post });
    if (post.status === "PUBLISHED" && post.isAutoVerified) {
      const { relevanceScore, harmfulnessScore } = await calcRelevance("post", title, content);
      if (relevanceScore < 50) {
        await post.update({ status: "DELISTED" });
        await PostHistory.create({
          title: post.title,
          content: post.content,
          tags: post.tags,
          action: "DELIST",
          status: post.status,
          PostCategoryId: post.PostCategoryId,
          UserId: post.UserId,
          PostId: post.id,
        });
        getIo().emit("forum/posts");
        getIo().emit(`forum/posts/${post.id}`);
      }
      if (harmfulnessScore > 50) {
        await post.update({ status: "DELISTED" });
        await PostHistory.create({
          title: post.title,
          content: post.content,
          tags: post.tags,
          action: "DELIST",
          status: post.status,
          PostCategoryId: post.PostCategoryId,
          UserId: post.UserId,
          PostId: post.id,
        });
        getIo().emit("forum/posts");
        getIo().emit(`forum/posts/${post.id}`);
      }
      await post.update({ isVerified: true });
    }
  } catch (err) {
    log(err, "ERROR", "FORUM");
    return res.status(500).json({ message: "Unexpected error while creating post" });
  }
};

module.exports = {
  post,
};
