const express = require("express");
const db = require("../models/DBContext");

const router = express.Router();

const SELECT_USER_NOTIFICATION=``;

const SELECT_USER_CURRENT_ONGOING_JOB =`Select 
j.job_id,u.username,j.job_title,j.job_tags,j.job_work_location,jh.job_status,jc.job_compensation_amount,jc.job_compensation_currency,jc.job_compensation_type
from job_history jh
join  job j on j.job_id=jh.job_id 
join auth u on j.user_id=u.user_id
join job_compensation jc on j.job_id = jc.job_id 
where jh.job_status='ongoing' and jh.user_id= @userId;`;

const SELECT_JOB_RELATED_TO_USER =``;

const SELECT_POST_RELATED_TO_USER =``;


router.get("/currentjob/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("userId", db.sql.Int, userId)
        .query(SELECT_USER_CURRENT_ONGOING_JOB);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.json(result.recordset);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }  
  });

  router.get("/relatedjob/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("userId", db.sql.Int, userId)
        .query(SELECT_JOB_RELATED_TO_USER);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.json(result.recordset);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }  
  });

  router.get("/relatedpost/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("userId", db.sql.Int, userId)
        .query(SELECT_POST_RELATED_TO_USER);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.json(result.recordset);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }  
  });



module.exports = router;