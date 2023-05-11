const { Session } = require("../models/sessionModel");

// GET workouts for a session
const getWorkouts = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findById(sessionId);
    const workouts = session.workouts;
    if (!workouts || !session) {
      res
        .status(404)
        .json({ status: false, message: "Invalid session or workout" });
    }
    res.status(200).json(workouts);
  } catch (err) {
    res.status(404).json({ status: true, message: err.message });
  }
};

// GET a single workout for a session
const getWorkout = async (req, res) => {
  const { sessionId, workoutId } = req.params;
  try {
    const session = await Session.findById(sessionId);
    const workouts = session.workouts;
    const singleWorkout = workouts.filter((workout) => {
      return workout._id.toString() == workoutId;
    });
    if (!workouts || !session || !singleWorkout) {
      res
        .status(404)
        .json({ status: false, message: "Invalid session or workout" });
    }
    res.json(singleWorkout);
  } catch (err) {
    res.status(404).json({ status: true, message: err.message });
  }
};

module.exports = { getWorkouts, getWorkout };
