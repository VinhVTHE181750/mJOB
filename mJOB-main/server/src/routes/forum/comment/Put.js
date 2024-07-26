const db = require("../../../models/DBContext");

const UPDATE_COMMENT = `
UPDATE comment
SET comment_content = @content
WHERE comment_id = @commentId;
`;

const put = async (req, res) => {
  try {
    const { commentId, content } = req.body;
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("commentId", db.sql.Int, commentId)
      .input("content", db.sql.NVarChar, content)
      .query(UPDATE_COMMENT);

    if (result.rowsAffected[0] === 0) {
      res.status(404).send();
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.status(500).send();
  }
};


module.exports = {
  put,
};