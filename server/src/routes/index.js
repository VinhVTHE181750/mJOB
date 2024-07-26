const authRoute = require("./Auth");
const forumRoute = require("./Forum");
const testRoute = require("./test");
const paymentRoute = require("./Payment");
const jobsRoute = require("./job/Jobs");
const dashboardRoute = require("./Dashboard");
const jobListRoute = require("./JobList");
const marketingRoute = require("./marketing");
const dataPostRoute = require("./datapost");
const hotJobRoute = require("./job/top3job");
const countTotalUser = require("./dashboard/countTotalUser");
const userRoute = require("./User");
const profileRoute = require("./Profile");
const workExperienceRoute = require("./WorkExperience");
const User = require("../models/user/User");
const whoami = require("./WhoAmI");
const profileRole = require("./dashboard/userManager");
const jobManage = require("./dashboard/jobManager");

module.exports = function applyRoutes(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/forum", forumRoute);
  app.use("/api/test", testRoute);
  app.use("/api/payment", paymentRoute);
  app.use("/api/jobs", jobsRoute);
  app.use("/api/myjobs", dashboardRoute);
  app.use("/api/joblist", jobListRoute);
  app.use("/api/marketing", marketingRoute);
  app.use("/api/datapost", dataPostRoute);
  app.use("/api/homeguest", hotJobRoute);
  app.use("/api/dashboard/count/user/total", countTotalUser);
  app.use("/api/users", userRoute);
  app.use("/api/profile", profileRoute);
  app.use("/api/workexp", workExperienceRoute);
  app.use("/api/whoami", whoami);
  app.use("/api/", profileRole);
  app.use("/api/", jobManage);

  // Setup other routes here
};
