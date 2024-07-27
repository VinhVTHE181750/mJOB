const express = require("express");
const db = require("../models/DBContext");
const Application = require("../models/job/Application");
const Job = require("../models/job/Job");
const User = require("../models/user/User");
const { getOngoingJob, getAppliedJob, getRelatedJob, getNewPost, getHotPosts } = require("./home/HomeUser");

const router = express.Router();


const SELECT_USER_CURRENT_ONGOING_JOB =`SELECT TOP 3
    j.job_id,
    a.username,
    j.job_title,
    j.job_work_location,
    j.job_description,
    jh.job_status
FROM
    job j
INNER JOIN
    job_history jh ON j.job_id = jh.job_id
INNER JOIN
    auth a ON jh.user_id = a.user_id
WHERE
    jh.job_status = 'ongoing' and jh.user_id=@userId;`;

const SELECT_USER_APPLIED_JOB =`SELECT TOP 3
    j.job_id,
    a.username,
    j.job_title,
    j.job_work_location,
    j.job_description,
    jh.job_status
FROM
    job j
INNER JOIN
    job_history jh ON j.job_id = jh.job_id
INNER JOIN
    auth a ON jh.user_id = a.user_id
WHERE
    jh.job_status = 'pending' and jh.user_id=@userId;`;



const SELECT_JOB_RELATED_TO_USER =`SELECT TOP 3
        j.job_id,
        u.username,
        j.job_title,
        j.job_tags,
        j.job_description,
        j.job_work_location,
        jc.job_compensation_amount,
        jc.job_compensation_currency,
        jc.job_compensation_type,
        DATEDIFF(DAY, GETDATE(), jr.job_recruitment_deadline) AS timeleft
    FROM
        work_xp wx
    INNER JOIN
        job j ON wx.user_id = j.user_id
    INNER JOIN
        [user] u ON wx.user_id = u.user_id
    INNER JOIN 
        job_compensation jc ON j.job_id = jc.job_id
    INNER JOIN 
        job_recruitment jr ON j.job_id = jr.job_id
    WHERE
        j.job_title LIKE '%Manager%' AND jr.job_recruitment_deadline>GETDATE();`;

const SELECT_3NEW_POST =`SELECT TOP 3
    p.post_id,
    p.post_title,
    p.post_content,
    u.username,
    p.date_created,
    p.[view],
    p.status
FROM
    posts_old p
INNER JOIN
    [user] u ON p.creator = u.user_id
ORDER BY
    p.date_created DESC;`;

const SELECT_3HOT_POST =`SELECT TOP 3
    p.post_id,
    p.post_title,
    p.post_content,
    u.username,
    p.date_created,
    p.[view],
    p.status
FROM
    posts_old p
INNER JOIN
    [user] u ON p.creator = u.user_id
ORDER BY
    p.[view] DESC;`;


// Route to fetch top 3 newest posts
// router.get('/newpost', async (req, res) => {
//   try {
//     const pool = await db.poolPromise;
//     const result = await pool.request().query(SELECT_3NEW_POST);
//     res.json(result.recordset);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error occurred", error: err });
//   }
//   });
router.get('/newpost', getNewPost);
router.get('/hotpost', getHotPosts);
// router.get('/ongoing', getOngoingJob);
// router.get('/applied', getAppliedJob);
// router.get('/related', getRelatedJob);








// Route to fetch user's ongoing jobs
router.get('/ongoing/:userId',  async (req, res) => {
try {
  const { userId } = req.params;

  const jobs = await Application.findAll({
    where: { UserId: userId, status: "ONGOING" },
    include: [
      { model: Job,
        attributes: [
          'id',
          'title',
          'description',
          'location',
          'tags',
          'maxApplicants',
          'recruitments',
          'approvalMethod',
          'contact',
          'startDate',
          'endDate',
          'salary',
          'salaryType',
          'salaryCurrency',
          'status' // Assuming you want to include job status
        ],
        include: [
          { model: User,
            attributes: ['username']
          }
        ]
      },
     ],
    limit: 4   
  });
  res.json(jobs);

} catch (err) {
  console.log(err);
  res.status(500).json({ message: "Error occurred", error: err });
}  
});

// Route to fetch user's pending jobs
router.get('/pending/:userId', async (req, res) => {
try {
  const { userId } = req.params;

 const jobs = await Application.findAll({
    where: { UserId: userId, status: "PENDING" },
    include: [
      { model: Job,
        attributes: [
          'id',
          'title',
          'description',
          'location',
          'tags',
          'maxApplicants',
          'recruitments',
          'approvalMethod',
          'contact',
          'startDate',
          'endDate',
          'salary',
          'salaryType',
          'salaryCurrency',
          'status' // Assuming you want to include job status
        ],
        include: [
          {
            model: User,
            attributes: ['username'],
          }
        ]
       }],
    limit: 4   
  });
  res.json(jobs);
} catch (err) {
  console.log(err);
  res.status(500).json({ message: "Error occurred", error: err });
}  
});

// Route to fetch related jobs
router.get('/relatedjobs', async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request().query(SELECT_JOB_RELATED_TO_USER);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});


module.exports = router;