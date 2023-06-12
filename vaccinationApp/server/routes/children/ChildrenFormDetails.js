const express = require("express");
const {
  getDetails,
  getDetail,
  createDetail,
  deleteDetail,
  updateDetailSetVaccinated,
} = require("../../controllers/children/ChildrenFormController");

const router = express.Router();

// GET sessions
router.get("/children/", getDetails);

// GET single session
router.get("/children/:id", getDetail);

// POST new session
router.post("/children/", createDetail);

// DELETE single session
router.delete("/children/:id", deleteDetail);

// PATCH update session by setting vaccine status
router.patch("/children/:id/set-vaccinated", updateDetailSetVaccinated);
module.exports = router;
