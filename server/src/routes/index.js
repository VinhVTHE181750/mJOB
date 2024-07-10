const authRoute = require("./Auth");
const forumRoute = require("./Forum");
const testRoute = require("./test");
const paymentRoute = require("./Payment");

module.exports = function applyRoutes(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/forum", forumRoute);
  app.use("/api/test", testRoute);
  app.use("/api/payment", paymentRoute);
  // Setup other routes here
};
