const express = require("express");
const router = express.Router();
const { getWorkouts, getWorkout } = require("../controllers/workoutController");
const apiAuth = require("../middleware/apiAuth");
router.use(apiAuth);
// GET workouts for a session
router.get("/:sessionId/workouts", getWorkouts);

// GET a single workout for a session
router.get("/:sessionId/workouts/:workoutId", getWorkout);

module.exports = router;
