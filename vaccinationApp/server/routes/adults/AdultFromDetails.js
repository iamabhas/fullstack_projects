const express = require("express");
const {
  getDetails,
  getDetail,
  createDetail,
  deleteDetail,
  updateDetailSetVaccinated,
} = require("../../controllers/adults/AdultFormController");

const router = express.Router();

// GET sessions
router.get("/adults/", getDetails);

// GET single session
router.get("/adults/:id", getDetail);

// POST new session
router.post("/adults/", createDetail);

// DELETE single session
router.delete("/adults/:id", deleteDetail);

// PATCH update session by setting vaccine status
router.patch("/adults/:id/set-vaccinated", updateDetailSetVaccinated);
module.exports = router;
