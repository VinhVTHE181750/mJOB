const authRoute = require("./Auth");
const forumRoute = require("./Forum");
const testRoute = require("./test");
const paymentRoute = require("./Payment");
const countTotalUser = require("./dashboard/countTotalUser");
const userRoute = require("./User");
const profileRoute = require("./Profile");
const workExperienceRoute = require("./WorkExperience");

module.exports = function applyRoutes(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/forum", forumRoute);
  app.use("/api/test", testRoute);
  app.use("/api/payment", paymentRoute);
  app.use("/api/dashboard/count/user/total", countTotalUser); 
  app.use("/api/users", userRoute);
  app.use("/api/profile", profileRoute)
  app.use("/api/workexp", workExperienceRoute);
  
  // Setup other routes here
};
