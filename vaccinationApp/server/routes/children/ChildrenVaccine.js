const express = require("express");
const router = express.Router();
const {
  getVaccines,
} = require("../../controllers/children/ChildrenVaccineController");
router.get("/childrenVaccines", getVaccines);

module.exports = router;
