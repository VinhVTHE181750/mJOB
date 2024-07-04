const db = require("../../../models/DBContext");

const DELETE_COMMENT = `DELETE FROM comment WHERE comment_id = @commentId;`;

const deleteById = async (req, res) => {
  try {
    const { commentId } = req.query;
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("commentId", db.sql.Int, commentId)
      .query(DELETE_COMMENT);
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
  deleteById,
};