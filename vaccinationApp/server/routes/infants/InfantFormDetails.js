const express = require("express");
const {
  getDetails,
  getDetail,
  createDetail,
  deleteDetail,
  updateDetailSetVaccinated,
} = require("../../controllers/infants/InfantFormController");

const router = express.Router();

// GET sessions
router.get("/infants/", getDetails);

// GET single session
router.get("/infants/:id", getDetail);

// POST new session
router.post("/infants/", createDetail);

// DELETE single session
router.delete("/infants/:id", deleteDetail);

// PATCH update session by setting vaccine status
router.patch("/infants/:id/set-vaccinated", updateDetailSetVaccinated);
module.exports = router;
