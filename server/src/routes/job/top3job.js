const express = require("express");
const db = require("../../models/DBContext");

const router = express.Router();

const SELECT_TOP3_JOBS=`select TOP 3 * from job j join job_view jv on j.job_id=jv.job_id order by jv.job_view desc;`

router.get("/top3jobs", async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request().query(SELECT_TOP3_JOBS);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

module.exports = router;
