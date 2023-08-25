const users = require("../models/users");

const getUsers = (req, res) => {
  return res.json(users);
};

const deleteUser = (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted !");
  } else {
    res.status(403).json("You are not admin ! Cannot Delete User !");
  }
};

module.exports = { deleteUser, getUsers };
