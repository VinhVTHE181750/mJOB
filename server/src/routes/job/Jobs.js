const express = require("express");
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

router.use(fileUpload());

router.post("/", async (req, res) => {
  let userId;
  //   if (!req.userId) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   } else userId = req.userId;
  //   if (isNaN(req.userId)) {
  //     return res.status(400).json({ message: "Invalid user ID" });
  //   }
  // uncomment để truyền userId từ request

  // test
  userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const {
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
    job_requirements, // Nhớ xử lí requirements dưới dạng mảng
    job_compensation_type,
    job_compensation_amounts,
    job_compensation_currencies,
    job_compensation_periods, // -> bỏ, dùng luôn compensation_type
    // đã có ONCE, HOURLY, DAILY, WEEKLY, MONTHLY, PERCENTAGE
    job_custom_iterations, // rườm rà -> bỏ
    status, // Thêm dòng này vào client, hoặc để nó mặc định là ACTIVE
    // Xem chi tiết tại file models/job/Job.js dòng 86 - 99
  } = req.body;
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
    paid: true,
    salary: job_compensation_amounts,
    salaryType: job_compensation_type,
    salaryCurrency: job_compensation_currencies,
    status: status,
  });
  try {
    const job = await newJob.save();
    // requirements is an array of {type, name}
    for (let i = 0; i < job_requirements.length; i++) {
      const requirement = await Requirement.create({
        JobId: job.id,
        type: job_requirements[i].type,
        // type can be TEXT or FILE
        name: job_requirements[i].name,
      });
    }
    const jobHistory = await JobHistory.create({
      JobId: job.id,
      UserId: req.userId,
      status: status,
      action: "CREATE",
    });
    return res.status(200).json(job);
  } catch (err) {
    log(err, "ERROR", "JOB");
    return res
      .status(500)
      .json({ message: "Unknown error while enlisting job." });
  }
});

router.put("/update", async (req, res) => {
  let userId;
  //   if (!req.userId) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   } else userId = req.userId;
  //   if (isNaN(req.userId)) {
  //     return res.status(400).json({ message: "Invalid user ID" });
  //   }
  // uncomment để truyền userId từ request

  // test
  userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

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
    job_requirements, // Nhớ xử lí requirements dưới dạng mảng
    job_compensation_type,
    job_compensation_amounts,
    job_compensation_currencies,
    job_compensation_periods, // -> bỏ, dùng luôn compensation_type
    // đã có ONCE, HOURLY, DAILY, WEEKLY, MONTHLY, PERCENTAGE
    job_custom_iterations, // rườm rà -> bỏ
    status, // Thêm dòng này vào client, hoặc để nó mặc định là ACTIVE
    // Xem chi tiết tại file models/job/Job.js dòng 86 - 99
  } = req.body;
  const job = await Job.findByPk(job_id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  // Lưu data mới vào model
  job.title = job_title;
  job.description = job_description;
  job.location = job_work_location;
  job.tags = job_tags;
  job.maxApplicants = job_max_applications;
  job.recruitments = job_number_of_recruits;
  job.approvalMethod = job_approval_method;
  job.contact = job_contact_info;
  job.startDate = job_start_date;
  job.endDate = job_end_date;
  job.paid = true;
  job.salary = job_compensation_amounts;
  job.salaryType = job_compensation_type;
  job.salaryCurrency = job_compensation_currencies;
  job.status = status;

  // Lưu model vào database
  try {
    await job.save();
    // Xóa hết requirements cũ
    const oldRequirements = await Requirement.findAll({
      where: { JobId: job.id },
    });
    for (let i = 0; i < oldRequirements.length; i++) {
      await oldRequirements[i].destroy();
    }

    // requirements is an array of {type, name}
    for (let i = 0; i < job_requirements.length; i++) {
      const requirement = await Requirement.create({
        JobId: job.id,
        type: job_requirements[i].type,
        // type can be TEXT or FILE
        name: job_requirements[i].name,
      });
    }
    const jobHistory = await JobHistory.create({
      JobId: job.id,
      UserId: req.userId,
      status: status,
      action: "UPDATE",
    });
    return res.status(200).json(job);
  } catch (err) {
    log(err, "ERROR", "JOB");
    return res
      .status(500)
      .json({ message: "Unknown error while updating job." });
  }
});

router.post("/upload", async (req, res) => {
  let userId;
  //   if (!req.userId) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   } else userId = req.userId;
  //   if (isNaN(req.userId)) {
  //     return res.status(400).json({ message: "Invalid user ID" });
  //   }
  // uncomment để truyền userId từ request

  // test
  userId = 1;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Đổi job_id thành requirementId, vì 1 job có nhiều requirements
  // mỗi requirement
  // Vẫn hỗ trợ 1 requirement nhiều file như cũ, nhưng support thêm nhiều requirement
  // mỗi job
  const { requirementId, files } = req.body;
  if (!requirementId) {
    return res.status(400).json({ message: "Invalid requirement ID" });
  }
  if (isNaN(requirementId)) {
    return res.status(400).json({ message: "Invalid requirement ID" });
  }
  if (!files) {
    return res.status(400).json({ message: "Files are required" });
  }

  const rqm = await Requirement.findByPk(requirementId);
  if (!req) {
    return res.status(404).json({ message: "Requirement not found" });
  }

  const fileArray = Array.isArray(files) ? files : [files];

  // Ensure the uploads directory exists
  const uploadDir = path.join(__dirname, "uploads");
  // nên đổi tên hoặc tạo sub-folder
  // có thể sau này cần upload file loại khác
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Check if already uploaded, if yes -> replace
  const oldFiles = await RequirementStorage.findAll({
    where: { RequirementId: rqm.id, UserId: userId },
  });

  if (oldFiles.length > 0) {
    // delete associated files
    for (const file of oldFiles) {
      const filePath = JSON.parse(file.data).file_path;
      fs.unlinkSync(filePath);
      // chưa có code xóa file trong file storage
      // để sau
      await file.destroy(); // xóa trong database
    }
  }

  // Code cũ chưa check nếu user đã upload file trước đó
  for (const file of fileArray) {
    const filePath = path.join(uploadDir, file.name);
    await file.mv(filePath);
    const jobRequirement = {
      RequirementId: rqm.id,
      data: JSON.stringify({ file_name: file.name, file_path: filePath }),
    };

    await Requirement.create(jobRequirement);
  }
});

router.get("/job-requirements/:jobId", async (req, res) => {
  const jobId = parseInt(req.params.jobId);
  if (!jobId) {
    return res.status(400).json({ message: "Invalid job ID" });
  }
  if (isNaN(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  const requirements = await Requirement.findAll({
    where: { JobId: jobId },
  });
  return res.status(200).json(requirements);
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
    return res
      .status(500)
      .json({ message: "Unknown error while downloading file" });
  }
});

router.post("apply-job", async (req, res) => {
  let userId;
  //   if (!req.userId) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   } else userId = req.userId;
  //   if (isNaN(req.userId)) {
  //     return res.status(400).json({ message: "Invalid user ID" });
  //   }
  // uncomment để truyền userId từ request

  // test
  userId = 1;
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
    return res
      .status(400)
      .json({ message: "You must submit the requirements first" });
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

router.get("/applied-jobs", async (req, res) => {
  let userId;
  //   if (!req.userId) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   } else userId = req.userId;
  //   if (isNaN(req.userId)) {
  //     return res.status(400).json({ message: "Invalid user ID" });
  //   }
  // uncomment để truyền userId từ request

  // test
  userId = 1;
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
  let userId;
  //   if (!req.userId) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   } else userId = req.userId;
  //   if (isNaN(req.userId)) {
  //     return res.status(400).json({ message: "Invalid user ID" });
  //   }
  // uncomment để truyền userId từ request

  // test
  userId = 1;
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
  let userId;
  //   if (!req.userId) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   } else userId = req.userId;
  //   if (isNaN(req.userId)) {
  //     return res.status(400).json({ message: "Invalid user ID" });
  //   }
  // uncomment để truyền userId từ request

  // test
  userId = 1;
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
    return res
      .status(500)
      .json({ message: "Unknown error while fetching job" });
  }
});

router.get("/applied-job-detail/:job_id", async (req, res) => {
  let userId;
  //   if (!req.userId) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   } else userId = req.userId;
  //   if (isNaN(req.userId)) {
  //     return res.status(400).json({ message: "Invalid user ID" });
  //   }
  // uncomment để truyền userId từ request

  // test
  userId = 1;
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
    return res
      .status(500)
      .json({ message: "Unknown error while fetching job" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
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
    return res.status(200).json(job);
  } catch (err) {
    log(err, "ERROR", "JOB");
    return res
      .status(500)
      .json({ message: "Unknown error while fetching job" });
  }
});

module.exports = router;