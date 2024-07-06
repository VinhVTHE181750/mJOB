const db = require("../../../models/DBContext");

const INSERT_COMMENT = `
INSERT INTO comment (comment_content, post_id, user_id) 
VALUES (@content, @postId, @userId);
`;

const insertComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

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
