const express = require("express");
const app = express();
const router = express.Router();
const Job = require("../../models/job/Job");
const User = require("../../models/user/User");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const JobHistory = require("../../models/job/JobHistory");
const { log } = require("../../utils/Logger");
const Requirement = require("../../models/job/Requirement");
const RequirementStorage = require("../../models/job/RequirementStorage");
const Application = require("../../models/job/Application");
const formidable = require('formidable');

app.use(fileUpload());

router.post("/", async (req, res) => {
  log(JSON.stringify(req.body), "INFO", "JOB");
  let userId;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else userId = req.userId;
  if (isNaN(req.userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  // uncomment để truyền userId từ request

  // test
  //userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const {
    job_title, // str
    job_work_location, // str
    job_tags, // str,str,str
    job_max_applications, // int
    job_approval_method, // boolean
    job_description, // str
    job_contact_info, // str
    job_start_date, // date
    job_end_date, // date
    job_number_of_recruits, // str
    job_requirements, // str;str;str
    // Nhớ xử lí requirements dưới dạng mảng
    job_compensation_type, // ONCE, HOURLY, DAILY, WEEKLY, MONTHLY, PERCENTAGE
    job_compensation_amounts, // int
    job_compensation_currencies,
    job_compensation_periods, // -> bỏ, dùng luôn compensation_type
    // đã có ONCE, HOURLY, DAILY, WEEKLY, MONTHLY, PERCENTAGE
    job_custom_iterations, // rườm rà -> bỏ
    status, // Thêm dòng này vào client, hoặc để nó mặc định là ACTIVE
    // Xem chi tiết tại file models/job/Job.js dòng 86 - 99
  } = req.body;

  if (job_title === undefined || job_title === null || job_title === "") {
    return res.status(400).json({ message: "Job title is required" });
  }

  if (job_work_location === undefined || job_work_location === null || job_work_location === "") {
    return res.status(400).json({ message: "Job work location is required" });
  }

  if (job_start_date === undefined || job_start_date === null || job_start_date === "") {
    return res.status(400).json({ message: "Job start date is required" });
  }

  if (job_end_date === undefined || job_end_date === null || job_end_date === "") {
    return res.status(400).json({ message: "Job end date is required" });
  }

  // salary types: ONETIME, HOURLY, DAILY, WEEKLY, MONTHLY, PERCENTAGE
  if (job_compensation_type === undefined || job_compensation_type === null || job_compensation_type === "") {
    return res.status(400).json({ message: "Job compensation type is required" });
  } else {
    if (
      job_compensation_type !== "AGREEMENT" &&
      job_compensation_type !== "ONETIME" &&
      job_compensation_type !== "HOURLY" &&
      job_compensation_type !== "DAILY" &&
      job_compensation_type !== "WEEKLY" &&
      job_compensation_type !== "MONTHLY" &&
      job_compensation_type !== "PERCENTAGE"
    ) {
      return res.status(400).json({ message: "Invalid job compensation type" });
    }
  }

  if (isNaN(job_compensation_amounts)) {
    return res.status(400).json({ message: "Invalid job compensation amount" });
  } else {
    if (job_compensation_amounts < 0) {
      return res.status(400).json({ message: "Invalid job compensation amount" });
    }
  }

  let currency;
  if (job_compensation_currencies === undefined || job_compensation_currencies === null || job_compensation_currencies === "") {
    // return res.status(400).json({ message: "Job compensation currency is required" });
    currency = "USD";
  } else {
    if (
      job_compensation_currencies !== "USD" &&
      job_compensation_currencies !== "VND" &&
      job_compensation_currencies !== "JPY" &&
      job_compensation_currencies !== "EUR" &&
      job_compensation_currencies !== "GBP"
    ) {
      return res.status(400).json({ message: "Invalid job compensation currency" });
    }
  }

  if (isNaN(job_max_applications) || job_max_applications < 0) {
    return res.status(400).json({ message: "Invalid job max applications" });
  }

  if (!job_approval_method) {
    job_approval_method = true;
    // true = auto; false = manual
  }

  if (job_description === undefined || job_description === null || job_description === "") {
    return res.status(400).json({ message: "Job description is required" });
  }

  if (job_contact_info === undefined || job_contact_info === null || job_contact_info === "") {
    return res.status(400).json({ message: "Job contact info is required" });
  }

  if (isNaN(job_number_of_recruits) || job_number_of_recruits < 0) {
    return res.status(400).json({ message: "Invalid job number of recruits" });
  }

  let cStatus;
  if (status === undefined || status === null || status === "") {
    cStatus = "ACTIVE";
  } else {
    if (status !== "ACTIVE") {
      return res.status(400).json({ message: "Job can only be created as ACTIVE " });
    }
  }

  const newJob = new Job({
    title: job_title,
    description: job_description,
    location: job_work_location,
    tags: job_tags,
    maxApplicants: job_max_applications,
    recruitments: job_number_of_recruits,
    approvalMethod: job_approval_method,
    contact: job_contact_info,
    startDate: job_start_date,
    endDate: job_end_date,
    salaryAmount: job_compensation_amounts,
    salaryType: job_compensation_type,
    salaryCurrency: currency,
    status: status || "ACTIVE",
  });
  try {
    const job = await newJob.save();
    // requirements is an array of {type, name}
    if (typeof job_requirements !== "string") {
      return res.status(400).json({ message: "Invalid job requirements" });
    }

    // for now, assume all requirements to be FILE
    const requirements = job_requirements.split(";");
    for (let i = 0; i < requirements.length; i++) {
      const job_requirements = requirements[i].trim();
      const requirement = await Requirement.create({
        JobId: job.id,
        type: "TEXT",
        // type can be TEXT or FILE
        name: job_requirements,
      });
    }

    const jobHistory = await JobHistory.create({
      JobId: job.id,
      UserId: req.userId,
      status: cStatus,
      action: "CREATE",
    });

    return res.status(201).json(job);
  } catch (err) {
    log(err, "ERROR", "JOB");
    return res.status(500).json({ message: "Unknown error while enlisting job." });
  }
});

router.put("/update", async (req, res) => {
  log(JSON.stringify(req.body), "INFO", "JOB");
  let userId;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else userId = req.userId;
  if (isNaN(req.userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  // uncomment để truyền userId từ request

  // test
  // userId = 1;
  const {
    id,
    title,
    location,
    tags,
    maxApplicants,
    recruitments,
    description,
    contact,
    startDate,
    endDate,
    job_requirements, // Nhớ xử lí requirements dưới dạng mảng
    salaryType,
    salary,
    salaryCurrency,
    // -> bỏ, dùng luôn compensation_type
    // đã có ONCE, HOURLY, DAILY, WEEKLY, MONTHLY, PERCENTAGE
    // Thêm dòng này vào client, hoặc để nó mặc định là ACTIVE
    // Xem chi tiết tại file models/job/Job.js dòng 86 - 99
  } = req.body;
  const job = await Job.findByPk(id);
  if (!job) {
    log(job);
    return res.status(404).json({ message: "Job not found" });
  }

  // Lưu data mới vào model
  job.title = title;
  job.description = description;
  job.location = location;
  job.tags = tags;
  job.maxApplicants = maxApplicants;
  job.recruitments = recruitments;
  //job.approvalMethod = approvalMethod;
  job.contact = contact;
  job.startDate = startDate;
  job.endDate = endDate;
  job.paid = true;
  job.salary = salary;
  job.salaryType = salaryType;
  job.salaryCurrency = salaryCurrency;

  // Lưu model vào database
  try {
    await job.save();

    const oldRequirements = await Requirement.findAll({ where: { JobId: job.id } });
    for (let req of oldRequirements) {
      await req.destroy();
    }

    if (job_requirements) {
      for (let req of job_requirements) {
        await Requirement.create({
          JobId: job.id,
          type: req.type,
          name: req.name,
        });
      }
    }
    const jobHistory = await JobHistory.create({
      JobId: job.id,
      UserId: req.userId,
      //status: status,
      action: "UPDATE",
    });
    return res.status(200).json(job);
  } catch (err) {
    log(err, "ERROR", "JOB");
    return res.status(500).json({ message: "Unknown error while updating job." });
  }
});

router.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, 'uploads'); // Set the upload directory
  form.keepExtensions = true; // Keep the file extensions

  // Ensure the uploads directory exists
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Error parsing form' });
    }

    try {
      const userId = req.userId;
      if (!userId || isNaN(userId)) {
        return res.status(401).json({ message: 'Unauthorized or invalid user ID' });
      }

      const requirementId = parseInt(fields.requirementId, 10);
      if (!requirementId || isNaN(requirementId)) {
        return res.status(400).json({ message: 'Invalid requirement ID' });
      }

      const requirement = await Requirement.findByPk(requirementId);
      if (!requirement) {
        return res.status(404).json({ message: 'Requirement not found' });
      }

      // Check if old files exist and delete them
      const oldFiles = await RequirementStorage.findAll({
        where: { RequirementId: requirement.id, UserId: userId },
      });

      if (oldFiles.length > 0) {
        for (const file of oldFiles) {
          const filePath = JSON.parse(file.data).file_path;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          await file.destroy(); // Delete from database
        }
      }

      // Save new files
      const fileArray = Array.isArray(files.files) ? files.files : [files.files];
      for (const file of fileArray) {
        const newFilePath = path.join(uploadDir, file.originalFilename);
        fs.renameSync(file.filepath, newFilePath); // Rename file from temp path to target path
        const jobRequirement = {
          RequirementId: requirement.id,
          data: JSON.stringify({ file_name: file.originalFilename, file_path: newFilePath }),
        };

        await RequirementStorage.create(jobRequirement);
      }

      res.status(200).json({ message: 'Files uploaded successfully!' });
    } catch (error) {
      console.error('Error in upload:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
});



router.get("/download/:fname", async (req, res) => {
  const fname = req.params.fname;

  // Validate the filename
  if (!/^[\w,\s-]+\.[A-Za-z]{3}$/.test(fname)) {
    return res.status(400).json({ message: "Invalid file name" });
  }

  const filePath = path.join(__dirname, "uploads", fname);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  try {
    return res.download(filePath);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unknown error while downloading file" });
  }
});

router.post("apply-job", async (req, res) => {
  // log(JSON.stringify(req.body), "INFO", "JOB");
  let userId;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else userId = req.userId;
  if (isNaN(req.userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  // uncomment để truyền userId từ request

  // test
  // userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // ở code cũ, truyền từ body là job_id, user_id, job_requirement_data
  // tuy nhiên, chỉ cần check xem user đã nộp req hay chưa

  const { job_id } = req.body; // bỏ 2 tham số user_id và rqm_data
  if (!job_id) {
    return res.status(400).json({ message: "Invalid job ID" });
  }
  if (isNaN(job_id)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }
  const job = await Job.findByPk(job_id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  let eligible = false;
  const rqmId = await Requirement.findOne({
    where: { JobId: job_id },
  });

  // nếu job k có req, k cần check
  if (!rqmId) {
    eligible = true;
  } else {
    // ngược lại, check xem user đã nộp req chưa
    const submittedReq = await RequirementStorage.findOne({
      where: { UserId: userId, RequirementId: rqmId },
    });
    if (submittedReq) {
      eligible = true;
    }
  }

  if (!eligible) {
    return res.status(400).json({ message: "You must submit the requirements first" });
  }

  // Tạo application, trạng thái chờ duyệt
  const application = await Application.create({
    JobId: jobId,
    UserId: userId,
    status: "PENDING",
  });

  // Nếu job là xét duyệt tự động, chuyển trạng thái thành ACCEPTED sau khi xử lí
  if (job.approvalMethod === true) {
    // true, 1: AUTO và 0: MANUAL
    // Thêm logic xét duyệt ở đây
    // Nếu đã đủ số lượng ứng viên, chuyển trạng thái thành REJECTED
    // Nếu không đủ điều kiện, chuyển trạng thái thành REJECTED
    // ...

    // Cuối cùng
    application.status = "ACCEPTED";
    await application.save();
  }

  // Tạo job history, action là APPLY
  const jobHistory = await JobHistory.create({
    JobId: jobId,
    UserId: userId,
    status: "PENDING",
    action: "APPLY",
  });
  return res.status(200).json(application);
});

router.get('/job-requirements/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const requirements = await Requirement.findAll({
      include: [{
        model: RequirementStorage,
        as: 'RequirementStorages', // Ensure this alias matches your association
        where: { JobId: id }, // Assuming you have a JobId in your RequirementStorage model
      }],
    });

    const requirementStorages = requirements.flatMap(req => req.RequirementStorages);

    res.status(200).json(requirementStorages);
  } catch (error) {
    console.error('Error fetching requirement storages:', error);
    res.status(500).json({ message: 'Failed to fetch requirement storages' });
  }
});


router.get("/applied-jobs", async (req, res) => {
  // log(JSON.stringify(req.body), "INFO", "JOB");
  let userId;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else userId = req.userId;
  if (isNaN(req.userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  // uncomment để truyền userId từ request

  // test
  // userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const applications = await Application.findAll({
    // trả về toàn bộ job đã ứng tuyển, show như thế nào do frontend quy định
    where: { UserId: userId },
  });
  if (applications.length === 0) {
    return res.status(404).json({ message: "No job found" });
  }
  return res.status(200).json(applications);
});

router.get("/created-jobs", async (req, res) => {
  // log(JSON.stringify(req.body), "INFO", "JOB");
  let userId;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else userId = req.userId;
  if (isNaN(req.userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  // uncomment để truyền userId từ request

  // test
  // userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const jobs = await Job.findAll({
    where: { UserId: userId },
  });
  if (jobs.length === 0) {
    return res.status(404).json({ message: "No job found" });
  }
  return res.status(200).json(jobs);
});

router.get("/created-job-detail/:job_id", async (req, res) => {
  // log(JSON.stringify(req.body), "INFO", "JOB");
  let userId;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else userId = req.userId;
  if (isNaN(req.userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  // uncomment để truyền userId từ request

  // test
  // userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const jobId = parseInt(req.params.job_id);

    if (!jobId) {
      return res.status(400).json({ message: "Invalid job ID" });
    }
    if (isNaN(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    // nếu k phải là người tạo job, k cho xem
    if (job.UserId !== userId) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (err) {
    log(err, "ERROR", "JOB");
    return res.status(500).json({ message: "Unknown error while fetching job" });
  }
});

router.get("/applied-job-detail/:job_id", async (req, res) => {
  // log(JSON.stringify(req.body), "INFO", "JOB");
  let userId;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else userId = req.userId;
  if (isNaN(req.userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  // uncomment để truyền userId từ request

  // test
  // userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const jobId = parseInt(req.params.job_id);

    if (!jobId) {
      return res.status(400).json({ message: "Invalid job ID" });
    }
    if (isNaN(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await Application.findOne({
      where: { JobId: jobId, UserId: userId },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json(application);
  } catch (err) {
    log(err, "ERROR", "JOB");
    return res.status(500).json({ message: "Unknown error while fetching job" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    if (isNaN(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Fetch the job details along with associated requirements
    const job = await Job.findByPk(jobId);

    const reqs = await Requirement.findAll({
      where: { JobId: jobId },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ job: job, requirements: reqs });
  } catch (err) {
    log(err, "ERROR", "JOB");
    return res.status(500).json({ message: "Unknown error while fetching job" });
  }
});


module.exports = router;
