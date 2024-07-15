const authRoute = require("./Auth");
const forumRoute = require("./Forum");
const testRoute = require("./test");
const paymentRoute = require("./Payment");
const jobsRoute = require("./jobs");
const dashboardRoute = require("./Dashboard");
const jobListRoute = require("./JobList");
const marketingRoute = require("./marketing");


const dataPostRoute = require("./datapost");


const hotJobRoute = require("./job/top3job");



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
  // Setup other routes here
};
