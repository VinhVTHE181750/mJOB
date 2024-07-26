const express = require("express");
const db = require("../models/DBContext");

const router = express.Router();

//Select content for DashBoard
const SELECT_USER_COMPLETED_JOB =`SELECT COUNT(*) AS total
  FROM job_history
  WHERE job_status = 'done' AND user_id = @userId;`;

const SELECT_USER_APPLIED_JOB =`SELECT COUNT(*) AS total
  FROM job_history
  WHERE job_status = 'pending' AND user_id = @userId;`;

const SELECT_USER_CREATED_JOB =`Select Count(*) AS total from job j where j.user_id= @userId;`;

const SELECT_USER_COMPLETED_JOBLIST = `Select Top 3 j.job_id,u.username,j.job_title,j.job_tags,j.job_work_location,jh.job_status from job_history jh
join  job j on j.job_id=jh.job_id 
join auth u on j.user_id=u.user_id
where jh.job_status='done' and jh.user_id= @userId;`

const SELECT_USER_APPLIED_JOBLIST = `Select Top 3 j.job_id,u.username,j.job_title,j.job_tags,j.job_work_location,jh.job_status from job_history jh
join  job j on j.job_id=jh.job_id 
join auth u on j.user_id=u.user_id
where jh.job_status='pending' and jh.user_id= @userId;`


//History Page
const SELECT_USER_JOB_HISTORY = `Select 
j.job_id,u.username,j.job_title,j.job_tags,j.job_work_location,jh.job_status,jc.job_compensation_amount,jc.job_compensation_currency,jc.job_compensation_type
from job_history jh
join  job j on j.job_id=jh.job_id 
join auth u on j.user_id=u.user_id
join job_compensation jc on j.job_id = jc.job_id 
where jh.user_id= @userId;`;

const SELECT_USER_JOBLIST_BY_STATUS = `Select j.job_id,u.username,j.job_title,j.job_tags,j.job_work_location,jh.job_status from job_history jh
join  job j on j.job_id=jh.job_id 
join auth u on j.user_id=u.user_id
where jh.user_id = @userId AND jh.job_status = @jobStatus`;

const SELECT_LIST_OF_STATUS = `select distinct job_status from job_history jh join auth u on jh.user_id=u.user_id where u.user_id= @userId;`;



//Select user total completed job
router.get("/completed/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("userId", db.sql.Int, userId)
        .query(SELECT_USER_COMPLETED_JOB);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.json(result.recordset[0]);
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }  
  });
  
  
  
  //Select user applied job
  router.get("/applied/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("userId", db.sql.Int, userId)
        .query(SELECT_USER_APPLIED_JOB);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.json(result.recordset[0]);
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }
  });
  
  //Select user created job
  router.get("/created/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("userId", db.sql.Int, userId)
        .query(SELECT_USER_CREATED_JOB);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.json(result.recordset[0]);
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }
  });


  
//Select user completed job list
router.get("/completedlist/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("userId", db.sql.Int, userId)
        .query(SELECT_USER_COMPLETED_JOBLIST);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.json(result.recordset);
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }  
  });
  
  
  //Select user applied joblist
  router.get("/appliedlist/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("userId", db.sql.Int, userId)
        .query(SELECT_USER_APPLIED_JOBLIST);
      if (result.recordset.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.json(result.recordset);
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }  
  });


  //Select user job history (current applied, current doing job,failed job and completed job) 
router.get("/jobhistory/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("userId", db.sql.Int, userId)
      .query(SELECT_USER_JOB_HISTORY);

    if (result.recordset.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }  
});


//Select user list of status available
router.get("/jobhistory/status/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("userId", db.sql.Int, userId)
      .query(SELECT_LIST_OF_STATUS);

    if (result.recordset.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }  
});

//Select user job history list w status available
router.get("/jobhistory/jobstatus/:userId/:jobStatus", async (req, res) => {
  try {
    const { userId, jobStatus } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("userId", db.sql.Int, userId)
      .input("jobStatus", db.sql.VarChar, jobStatus)
      .query(SELECT_USER_JOBLIST_BY_STATUS);

    if (result.recordset.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

module.exports = router;