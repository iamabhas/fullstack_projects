const express = require("express");
const router = express.Router();

const { signupUser, loginUser } = require("../controllers/userController");

router.post("/user/login", loginUser);
router.post("/user/signup", signupUser);

module.exports = router;
