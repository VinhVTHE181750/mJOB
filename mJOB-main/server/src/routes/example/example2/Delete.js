const db = require("../../../models/DBContext");

const DELETE_QUERY = `DELETE FROM ...;`;

const deleteById = async (req, res) => {
//   try {
//     const result = await pool
//       .request()
//       .query(DELETE_QUERY);
//     if (result.rowsAffected[0] === 0) {
//       res.status(404).send();
//     } else {
//       res.status(200).send();
//     }
//   } catch (err) {
//     res.status(500).send();
//   }
    res.send("Example will not be deleted");
};

module.exports = {
  deleteById
}