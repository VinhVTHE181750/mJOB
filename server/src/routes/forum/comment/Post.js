const { sequelize } = require("../../../models/SQLize");
const Comment = require("../../../models/forum/comment/Comment");

const insertComment = async (req, res) => {
  const userId = req.userId;
  if(!userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    const { postId, content } = req.body;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("postId", db.sql.Int, postId)
      .input("userId", db.sql.Int, userId)
      .input("content", db.sql.NVarChar, content)
      .query(INSERT_COMMENT);
      
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

module.exports = {
  insertComment,
};
