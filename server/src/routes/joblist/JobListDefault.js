const express = require("express");
const db = require("../../models/DBContext");

const router = express.Router();

//Select JobList Content Default
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



//Select Job list content by default  
router.get("/api/joblist", async (req, res) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool.request().query(SELECT_JOBLIST_CONTENT);
      res.json(result.recordset);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Error occurred", error: err });
    }
  });
  
  
  