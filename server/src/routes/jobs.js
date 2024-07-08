const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../../config.json');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

// SQL Server connection pool
const poolPromise = new sql.ConnectionPool(dbConfig.database).connect().then(pool => {
  console.log('Connected to SQL Server');
  return pool;
}).catch(err => {
  console.error('Database Connection Failed!', err);
});

router.use(fileUpload());

const checkUserIdExists = async (user_id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', sql.Int, user_id)
      .query('SELECT COUNT(*) as count FROM auth WHERE user_id = @user_id');
    
    return result.recordset[0].count > 0;
  } catch (error) {
    console.error('Error checking user_id:', error);
  }
};

// POST route to insert a job
router.post('/', async (req, res) => {
  const {
    // user_id, 
    job_title, 
    job_work_location, 
    job_tags, 
    job_max_applications, 
    job_approval_method,
    job_description, 
    job_contact_info,
    job_start_date,
    job_end_date,
    job_number_of_recruits,
    job_requirements,
    job_compensation_types,
    job_compensation_amounts ,
    job_compensation_currencies ,
    job_compensation_periods ,
    job_custom_iterations 
  } = req.body;
  const user_id = 1;
  try {
    const userExists = await checkUserIdExists(user_id);
    if (!userExists) {
      return res.status(400).send({ error: 'User ID does not exist' });
    }

    const pool = await poolPromise;
    const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .input('job_title', sql.NVarChar, job_title)
    .input('job_work_location', sql.NVarChar, job_work_location)
    .input('job_tags', sql.NVarChar, job_tags)
    .input('job_max_applications', sql.Int, job_max_applications)
    .input('job_approval_method', sql.Bit, job_approval_method)
    .input('job_description', sql.NVarChar, job_description)
    .input('job_contact_info', sql.NVarChar, job_contact_info)
    .input('job_start_date', sql.Date, job_start_date)
    .input('job_end_date', sql.Date, job_end_date)
    .input('job_number_of_recruits', sql.Int, job_number_of_recruits)
    .input('job_requirements', sql.NVarChar, job_requirements)
    .input('job_compensation_types', sql.NVarChar, job_compensation_types)
    .input('job_compensation_amounts', sql.NVarChar, job_compensation_amounts)
    .input('job_compensation_currencies', sql.NVarChar, job_compensation_currencies)
    .input('job_compensation_periods', sql.NVarChar, job_compensation_periods)
    .input('job_custom_iterations', sql.NVarChar, job_custom_iterations)
      .query(`
        INSERT INTO job (user_id, job_title, job_work_location, job_tags, job_max_applications, job_approval_method, job_description, job_contact_info, job_start_date, job_end_date, job_number_of_recruits, job_requirements, job_compensation_types, job_compensation_amounts, job_compensation_currencies, job_compensation_periods, job_custom_iterations)
        VALUES (@user_id, @job_title,  @job_work_location, @job_tags, @job_max_applications, @job_approval_method,  @job_description, @job_contact_info, @job_start_date, @job_end_date, @job_number_of_recruits, @job_requirements, @job_compensation_types, @job_compensation_amounts, @job_compensation_currencies, @job_compensation_periods, @job_custom_iterations);
      `);

    res.status(201).send({ message: 'Job successfully inserted' });
  } catch (error) {
    console.error('Error inserting job:', error);
    res.status(500).send({ error: 'An error occurred while inserting the job' });
  }
});

router.put('/update', async (req, res) => {
  const {
    job_id,
    job_title, 
    job_work_location, 
    job_tags, 
    job_max_applications, 
    job_approval_method,
    job_description, 
    job_contact_info,
    job_start_date,
    job_end_date,
    job_number_of_recruits,
    job_requirements,
    job_compensation_types,
    job_compensation_amounts ,
    job_compensation_currencies ,
    job_compensation_periods ,
    job_custom_iterations 
  } = req.body;
  const user_id = 1;
  try {
    const userExists = await checkUserIdExists(user_id);
    if (!userExists) {
      return res.status(400).send({ error: 'User ID does not exist' });
    }

    const pool = await poolPromise;
    const result = await pool.request()
    .input('job_id', sql.Int, job_id)
    .input('user_id', sql.Int, user_id)
    .input('job_title', sql.NVarChar, job_title)
    .input('job_work_location', sql.NVarChar, job_work_location)
    .input('job_tags', sql.NVarChar, job_tags)
    .input('job_max_applications', sql.Int, job_max_applications)
    .input('job_approval_method', sql.Bit, job_approval_method)
    .input('job_description', sql.NVarChar, job_description)
    .input('job_contact_info', sql.NVarChar, job_contact_info)
    .input('job_start_date', sql.Date, job_start_date)
    .input('job_end_date', sql.Date, job_end_date)
    .input('job_number_of_recruits', sql.Int, job_number_of_recruits)
    .input('job_requirements', sql.NVarChar, job_requirements)
    .input('job_compensation_types', sql.NVarChar, job_compensation_types)
    .input('job_compensation_amounts', sql.NVarChar, job_compensation_amounts)
    .input('job_compensation_currencies', sql.NVarChar, job_compensation_currencies)
    .input('job_compensation_periods', sql.NVarChar, job_compensation_periods)
    .input('job_custom_iterations', sql.NVarChar, job_custom_iterations)
      .query(`
        UPDATE job SET
        job_title = @job_title,
        job_work_location = @job_work_location,
        job_tags = @job_tags,
        job_max_applications = @job_max_applications,
        job_approval_method = @job_approval_method,
        job_description = @job_description,
        job_contact_info = @job_contact_info,
        job_start_date = @job_start_date,
        job_end_date = @job_end_date,
        job_number_of_recruits = @job_number_of_recruits,
        job_requirements = @job_requirements,
        job_compensation_types = @job_compensation_types,
        job_compensation_amounts = @job_compensation_amounts,
        job_compensation_currencies = @job_compensation_currencies,
        job_compensation_periods = @job_compensation_periods,
        job_custom_iterations = @job_custom_iterations
        WHERE user_id = @user_id AND job_id = @job_id;  
      `);

    res.status(200).send({ message: 'Job successfully updated' });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).send({ error: 'An error occurred while updating the job' });
  }
});

router.post('/upload', async (req, res) => {
  const job_id = req.body.job_id;
  const files = req.files.files;

  if (!job_id || !files) {
    return res.status(400).send({ error: 'Job ID and files are required' });
  }

  try {
    const pool = await poolPromise;

    const fileArray = Array.isArray(files) ? files : [files];

    // Ensure the uploads directory exists
    const uploadDir = path.join(__dirname, '..', 'client', 'src', 'assets' , 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const file of fileArray) {
      const filePath = path.join(uploadDir, file.name);
      await file.mv(filePath);

      const jobRequirement = {
        requirement_id: null,
        job_id: job_id,
        job_requirement: JSON.stringify({ file_name: file.name, file_path: filePath })
      };

      await pool.request()
        .input('job_id', sql.Int, jobRequirement.job_id)
        .input('job_requirement', sql.NVarChar, jobRequirement.job_requirement)
        .query(
          'INSERT INTO job_requirement (job_id, job_requirement) VALUES (@job_id, @job_requirement)'
        );
    }

    res.status(201).send({ message: 'Files successfully uploaded and job requirements added' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send({ error: 'An error occurred while uploading files' });
  }
});


router.get("/:id", async (req, res) => {

  
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM job WHERE job_id = @id');
  
      if (result.recordset.length === 0) {
        return res.status(404).send({ message: 'Job not found' });
      }
  
      res.send(result.recordset[0]);
    } catch (error) {
      console.error('Error fetching job details:', error);
      res.status(500).send({ error: 'An error occurred while fetching job details' });
    }
  });
module.exports = router;