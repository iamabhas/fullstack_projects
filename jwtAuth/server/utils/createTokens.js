const jwt = require("jsonwebtoken");
const { secretKey, refreshKey } = require("../utils/secretKeys");

const createAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secretKey, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, refreshKey, {
    expiresIn: "1h",
  });
};

module.exports = { createAccessToken, createRefreshToken };
