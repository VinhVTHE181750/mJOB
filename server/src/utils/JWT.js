const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const JwtMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        req.user = jwt.verify(token, config.jwtSecret);
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({error: "Unauthorized"});
    }
};


module.exports = JwtMiddleware;