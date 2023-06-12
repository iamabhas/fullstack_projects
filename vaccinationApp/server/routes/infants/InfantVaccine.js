const express = require("express");
const router = express.Router();
const {
  getVaccines,
} = require("../../controllers/infants/InfantVaccineController");
router.get("/infantVaccines", getVaccines);

module.exports = router;
