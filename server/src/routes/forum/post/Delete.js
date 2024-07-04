const db = require("../../../models/DBContext");

const DELETE_POST = `DELETE FROM post WHERE post_id = @post_id;`;

const deleteById = async (req, res) => {
  try {
    const { id } = req.query;
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("post_id", db.sql.Int, id)
      .query(DELETE_POST);
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
