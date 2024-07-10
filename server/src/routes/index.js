const authRoute = require("./Auth");
const forumRoute = require("./Forum");
const testRoute = require("./test");

module.exports = function applyRoutes(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/forum", forumRoute);
  app.use("/api/test", testRoute);
  // Setup other routes here
};