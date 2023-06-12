const express = require("express");
const {
  createSession,
  getSessions,
  getSession,
  deleteSession,
  updateSessionAddWorkout,
  updateSessionDeleteWorkout,
  updateSessionSetComplete,
} = require("../controllers/sessionController");
const apiAuth = require("../middleware/apiAuth");
const router = express.Router();
router.use(apiAuth);
// GET sessions
router.get("/", getSessions);

// GET single session
router.get("/:id", getSession);

// POST new session
router.post("/", createSession);

// DELETE single session
router.delete("/:id", deleteSession);

// PATCH update session by adding a workout
router.patch("/:id/add-workout", updateSessionAddWorkout);

// PATCH update session by deleting a workout
router.patch("/:id/delete-workout", updateSessionDeleteWorkout);

// PATCH update session by setting complete status
router.patch("/:id/set-complete", updateSessionSetComplete);
module.exports = router;
