const express = require("express");
const router = express.Router();
const PostHistory = require("../../models/forum/post/PostHistory");

const getHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await PostHistory.findAll({
      where: {
        PostId: id,
      },
    });
    if (history.length === 0) {
      res.status(404).json({ message: "No history found." });
      return;
    }
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Unexpected error while getting post history" });
  }
};

router.get("/:id", getHistory);

module.exports = router;
