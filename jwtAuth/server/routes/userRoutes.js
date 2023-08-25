const express = require("express");
const router = express.Router();
const apiAuth = require("../middlewares/apiAuth");
const { deleteUser, getUsers } = require("../controllers/userController");

router.delete("/users/:userId", apiAuth, deleteUser);
router.get("/allusers", getUsers);

module.exports = router;
