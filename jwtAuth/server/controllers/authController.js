const users = require("../models/users");
const jwt = require("jsonwebtoken");
const { refreshKey } = require("../utils/secretKeys");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createTokens");

let refreshTokens = [];

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("Username or Password is wrong !");
  }
};

const logout = (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("User logged out !");
};

const refresh = (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json("Auth token required !");
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send("Invalid Token !");
  jwt.verify(refreshToken, refreshKey, (err, user) => {
    err && console.log(err);

    //delete token
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    console.log(user);
    refreshTokens.push(newRefreshToken);
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

module.exports = { refresh, login, logout };
