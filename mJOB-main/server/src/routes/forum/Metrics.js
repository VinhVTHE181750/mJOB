const express = require("express");
const router = express.Router();
const PostMetric = require("../../models/forum/metric/PostMetric");
const CommentMetric = require("../../models/forum/metric/CommentMetric");

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
      return res
        .status(400)
        .json({ message: "Start and end date must be in format YYYY-MM-DD" });
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
      return res
        .status(400)
        .json({ message: "End date cannot be in the future" });
    }
  }

  let startDate = "";
  if (!start) startDate = new Date(now - 1000 * 60 * 60 * 24 * 7);
  // default to 7 days ago
  else {
    const startArr = start.split("-");
    const startDate = new Date(startArr[0], startArr[1], startArr[2]);
    if (startDate > endDate) {
      return res
        .status(400)
        .json({ message: "Start date cannot be after end date" });
    }
  }

  // id validate
  // if both ids are provided, send 400
  if ((PostId && CommentId) || (!PostId && !CommentId)) {
    return res
      .status(400)
      .json({ message: "Either PostId or CommentId must be provided" });
  }

  if (PostId) {
    const reactions = PostMetric.findAll({
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
    const reactions = CommentMetric.count({
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

// Define routes
router.get("/", forumMetricRoute);
router.get("/reactions", getReactions);
module.exports = router;
