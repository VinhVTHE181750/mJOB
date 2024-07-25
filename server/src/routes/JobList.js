const express = require("express");
const db = require("../models/DBContext");
const {getJobListbyDefaut, getJobListbyView, getJobListbyDate} = require("./joblist/JobList");

const router = express.Router();

//Select JobList Content
const SELECT_JOBLIST_CONTENT = `SELECT 
    j.job_id,
    u.username,
    j.job_title,
    j.job_tags,
    j.job_work_location,
    jc.job_compensation_amount,
    jc.job_compensation_currency,
    jc.job_compensation_type,
    DATEDIFF(DAY, GETDATE(), jr.job_recruitment_deadline) AS timeleft
FROM 
    job j
INNER JOIN 
    auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN 
    job_view jv ON j.job_id = jv.job_id
INNER JOIN 
    job_log jl ON j.job_id = jl.job_id
INNER JOIN 
    job_compensation jc ON j.job_id = jc.job_id
INNER JOIN 
    job_recruitment jr ON j.job_id = jr.job_id
WHERE 
    jl.job_log_type = 'create'
ORDER BY 
    j.job_id;`;

const SELECT_JOBLIST_CONTENT_BY_VIEW=`SELECT 
    j.job_id,
    u.username,
    j.job_title,
    j.job_tags,
    j.job_work_location,
    jc.job_compensation_amount,
    jc.job_compensation_currency,
    jc.job_compensation_type,
    DATEDIFF(DAY, GETDATE(), jr.job_recruitment_deadline) AS timeleft
FROM 
    job j
INNER JOIN 
    auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN 
    job_view jv ON j.job_id = jv.job_id
INNER JOIN 
    job_log jl ON j.job_id = jl.job_id
INNER JOIN 
    job_compensation jc ON j.job_id = jc.job_id
INNER JOIN 
    job_recruitment jr ON j.job_id = jr.job_id
WHERE 
    jl.job_log_type = 'create'
ORDER BY jv.job_view DESC;`;

const SELECT_JOBLIST_CONTENT_BY_TIME=`SELECT 
    j.job_id,
    u.username,
    j.job_title,
    j.job_tags,
    j.job_work_location,
    jc.job_compensation_amount,
    jc.job_compensation_currency,
    jc.job_compensation_type,
    DATEDIFF(DAY, GETDATE(), jr.job_recruitment_deadline) AS timeleft
FROM 
    job j
INNER JOIN 
    auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN 
    job_view jv ON j.job_id = jv.job_id
INNER JOIN 
    job_log jl ON j.job_id = jl.job_id
INNER JOIN 
    job_compensation jc ON j.job_id = jc.job_id
INNER JOIN 
    job_recruitment jr ON j.job_id = jr.job_id
WHERE 
    jl.job_log_type = 'create'
ORDER BY jl.job_log_time DESC;`;

//Select Job list content by default  
router.get("/", async (req, res) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool.request().query(SELECT_JOBLIST_CONTENT);
      res.json(result.recordset);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }
  });

//Select Job list content by view
router.get("/byView", async (req, res) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool.request().query(SELECT_JOBLIST_CONTENT_BY_VIEW);
      res.json(result.recordset);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }
  });

//Select Job list content by time
 router.get("/byDayCreated", async (req, res) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool.request().query(SELECT_JOBLIST_CONTENT_BY_TIME);
      res.json(result.recordset);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }
  });

router.get("/default",getJobListbyDefaut);

router.get("/view",getJobListbyView);

router.get("/date",getJobListbyDate);

module.exports = router;