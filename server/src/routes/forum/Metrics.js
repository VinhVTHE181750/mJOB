const express = require("express");
const router = express.Router();
const PostMetric = require("../../models/forum/metric/PostMetric");
const CommentMetric = require("../../models/forum/metric/CommentMetric");
const TagMetric = require("../../models/forum/metric/TagMetric");
const CategoryMetric = require("../../models/forum/metric/CategoryMetric");
const PostCategory = require("../../models/forum/post/PostCategory");
const PostTag = require("../../models/forum/post/PostTag");
const { log } = require("../../utils/Logger");

const forumMetricRoute = async (req, res) => {
  const msg = "This is a metric route of forum";
  res.status(200).json({ message: msg });
};

const getReactions = async (req, res) => {
  let { PostId, CommentId, start, end, period } = req.query;

  // date validate
  // period must be d,w,m,y
  if (!period) {
    period = "d";
  }
  if (period && !["d", "w", "m", "y"].includes(period)) {
    return res.status(400).json({ message: "Period must be d, w, m, or y" });
  }

  // validate start, end: must be in format YYYY-MM-DD
  if (start || end) {
    const startArr = start.split("-");
    const endArr = end.split("-");
    if (startArr.length !== 3 || endArr.length !== 3) {
      return res.status(400).json({ message: "Start and end date must be in format YYYY-MM-DD" });
    }
  }

  let endDate = "";
  // if end > now, send 400
  const now = new Date();
  if (!end) end = now;
  else {
    const endArr = end.split("-");
    endDate = new Date(endArr[0], endArr[1], endArr[2]);
    if (endDate > now) {
      return res.status(400).json({ message: "End date cannot be in the future" });
    }
  }

  let startDate = "";
  if (!start) startDate = new Date(now - 1000 * 60 * 60 * 24 * 7);
  // default to 7 days ago
  else {
    const startArr = start.split("-");
    const startDate = new Date(startArr[0], startArr[1], startArr[2]);
    if (startDate > endDate) {
      return res.status(400).json({ message: "Start date cannot be after end date" });
    }
  }

  // id validate
  // if both ids are provided, send 400
  if ((PostId && CommentId) || (!PostId && !CommentId)) {
    return res.status(400).json({ message: "Either PostId or CommentId must be provided" });
  }

  if (PostId) {
    const reactions = await PostMetric.findAll({
      where: {
        PostId,
        createdAt: {
          [Op.between]: [start, end],
        },
      },
    });
    let likes = [];
    let dislikes = [];
    // reactions contain records that each have likes, dislikes
    // assign them to those two arrays
    if (reactions) {
      for (let i = 0; i < reactions.length; i++) {
        likes.push(reactions[i].likes);
        dislikes.push(reactions[i].dislikes);
      }
    }
    return res.status(200).json({
      likes,
      dislikes,
    });
  }

  if (CommentId) {
    const reactions = await CommentMetric.count({
      where: {
        CommentId,
      },
    });

    let likes = [];
    let dislikes = [];
    // reactions contain records that each have likes, dislikes
    // assign them to those two arrays
    if (reactions) {
      for (let i = 0; i < reactions.length; i++) {
        likes.push(reactions[i].likes);
        dislikes.push(reactions[i].dislikes);
      }
    }
    return res.status(200).json({
      likes,
      dislikes,
    });
  }

  return res.status(200).json({
    PostId,
    CommentId,
  });
};

const addMetadataMetric = async (category, tags, metric) => {
  if (tags) {
    const tagsArr = tags.split(",").filter((tag) => /^[a-zA-Z0-9]+$/.test(tag));
    if (tagsArr.length === 0) {
      return res.status(400).json({ message: "Tags must be alphanumeric" });
    }

    await Promise.all(
      tagsArr.map(async (tag) => {
        const [t, created] = await PostTag.findOrCreate({
          where: { name: tag },
        });
        await TagMetric.findOrCreate({
          where: {
            PostTagId: t.id,
            day: new Date().toISOString().split("T")[0],
          },
        }).then(([tMetric]) => tMetric.increment(metric));
      })
    );
  }

  if (category) {
    if (!/^[a-zA-Z0-9]+$/.test(category)) {
      return res.status(400).json({ message: "Category must be alphanumeric" });
    }

    const ct = await PostCategory.findOne({ where: { name: category } });
    if (!ct) {
      return res.status(400).json({ message: "Category not found" });
    }

    try {
      const [categoryMetric, created] = await CategoryMetric.findOrCreate({
        where: {
          PostCategoryId: ct.id,
          day: new Date().toISOString().split("T")[0],
        },
      });

      if (created) {
        await categoryMetric.increment(metric);
      } else {
        await categoryMetric.increment(metric);
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "An error occurred", error: error.message });
    }
  }
}

const onSearch = async (req, res) => {
  const { tags, category } = req.query;

  if (!tags && !category) {
    return res.status(400).json({ message: "Tags or category must be provided" });
  }

  try {
    addMetadataMetric(category, tags, "searches");
    return res.status(200).json({ message: "Search recorded" });
  } catch (error) {
    log(error, "ERROR", "forum/metrics");
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Define routes
router.get("/", forumMetricRoute);
router.get("/reactions", getReactions);
router.get("/search", onSearch);
module.exports = router;
