// routes/profiles.js
const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../../models/DBContext');

// SQL query to fetch all user profiles and their work information
const SELECT_ALL_PROFILES = `
SELECT 
  u.user_id, 
  u.user_avatar, 
  u.user_bio AS username, 
  u.user_dob, 
  u.user_email, 
  u.user_phone_number AS contactNumber, 
  u.user_citizen_id AS citizenId, 
  u.user_address AS address, 
  w.work_job_title, 
  w.work_job_description, 
  w.work_company, 
  w.work_start_date, 
  w.work_end_date, 
  w.work_other_info 
FROM 
  [dbo].[profile] u 
LEFT JOIN 
  [dbo].[work_xp] w 
ON 
  u.user_id = w.user_id;
`;

// GET all profiles
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(SELECT_ALL_PROFILES);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching all profiles:', err);
    res.status(500).send('Error fetching all profiles');
  }
});

module.exports = router;
