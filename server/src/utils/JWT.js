const jwt = require("jsonwebtoken");
const config = require("../../config.json");

const JwtMiddleware = async (req, res, next) => {
  // token = cookie named token
  const token = req.cookies.token;

  if (token) {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.userId = decoded.id;
    req.role = decoded.role;
  }

  next();
};

const createToken = (user) => {
  return jwt.sign(user, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
    issuer: config.jwt.issuer,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret, { issuer: config.jwt.issuer });
};

module.exports = { createToken, verifyToken, JwtMiddleware };
