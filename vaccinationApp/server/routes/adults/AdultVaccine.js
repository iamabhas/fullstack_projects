const express = require("express");
const router = express.Router();
const {
  getVaccines,
} = require("../../controllers/adults/AdultVaccineController");
router.get("/adultVaccines", getVaccines);

module.exports = router;
