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
  // const csrfExclude = ["/api/auth/login", "/api/auth/register"]; // Paths to exclude
  // app.use((req, res, next) => {
  //   if (csrfExclude.indexOf(req.path) !== -1) {
  //     next();
  //   } else {
  //     csrfProtection(req, res, next);
  //   }
  // });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(JwtMiddleware);
  // app.use(interceptor)
  // Log middleware initialization here
};
