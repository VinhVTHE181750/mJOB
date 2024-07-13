const db = require('../../models/DBContext');
const { poolPromise } = require('../../models/DBContext');

const INSERT_WORK_INFO = `
INSERT INTO work_xp (user_id, work_job_title, work_job_description, work_company, work_start_date, work_end_date, work_other_info)
VALUES (@user_id, @work_job_title, @work_job_description, @work_company, @work_start_date, @work_end_date, @work_other_info);
`;
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
const submitProfile = async (req, res) => {
  try {
    const { userId, workJobTitle, workJobDescription, workCompany, workStartDate, workEndDate, workOtherInfo } = req.body;
    const pool = await db.poolPromise;

    await pool
      .request()
      .input("user_id", db.sql.Int, userId)
      .input("work_job_title", db.sql.NVarChar, workJobTitle)
      .input("work_job_description", db.sql.NVarChar, workJobDescription)
      .input("work_company", db.sql.NVarChar, workCompany)
      .input("work_start_date", db.sql.Date, workStartDate)
      .input("work_end_date", db.sql.Date, workEndDate)
      .input("work_other_info", db.sql.NVarChar, workOtherInfo)
      .query(INSERT_WORK_INFO);

    res.status(201).send('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Error inserting data');
  }
};

const getProfiles = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.query(SELECT_ALL_PROFILES);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching all profiles:', err);
    res.status(500).json({ message: 'Error fetching all profiles' });
  }
};

module.exports = {
  submitProfile,
  getProfiles
};
