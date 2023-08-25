const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/secretKeys");

const apiAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json("Invalid Token !");
      }
      req.user = user;
      console.log(req.user);
      next();
    });
  } else {
    res.status(401).json("Auth Token required !");
  }
};

module.exports = apiAuth;
