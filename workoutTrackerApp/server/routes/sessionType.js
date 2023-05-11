const express = require("express");
const router = express.Router();
const { getSessionTypes } = require("../controllers/sessionTypeController");
router.get("/sessionTypes", getSessionTypes);

module.exports = router;
