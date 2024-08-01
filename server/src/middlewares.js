const cors = require("cors");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const config = require("../config.json");
const { log } = require("./utils/Logger");
const { JwtMiddleware } = require("./utils/JWT");
const interceptor = require("./utils/Interceptor");
const initializeCronJobs = require("./services/cron");
// const csurf = require("csurf");
// const csrfProtection = csurf({ cookie: true });

module.exports = function applyMiddlewares(app) {
  app.use(cors({ origin: config.middleware.cors.origin, credentials: true }));
  app.use(
    rateLimit({
      windowMs: config.middleware.rateLimiter.windowMs,
      max: config.middleware.rateLimiter.max,
    })
  );
  app.use(compression());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
      },
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(JwtMiddleware);
  initializeCronJobs();
  // app.use(interceptor);
};
