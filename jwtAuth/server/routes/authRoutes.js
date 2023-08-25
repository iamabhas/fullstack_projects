const express = require("express");
const router = express.Router();
const apiAuth = require("../middlewares/apiAuth");
const { refresh, login, logout } = require("../controllers/authController");

router.post("/login", login);
router.post("/logout", apiAuth, logout);
router.post("/refresh", refresh);

module.exports = router;
