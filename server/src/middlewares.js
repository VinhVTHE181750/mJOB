const cors = require("cors");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const config = require("../config.json");
const { log } = require("./utils/Logger");
const csurf = require("csurf");
const csrfProtection = csurf({ cookie: true });

module.exports = function applyMiddlewares(app) {
  app.use(csrfProtection);
  app.use(cors({ origin: config.middleware.cors.origin }));
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
  // Log middleware initialization here
};
