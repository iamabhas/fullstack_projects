const { Session } = require("../models/sessionModel");
const mongoose = require("mongoose");

//GET sessions
const getSessions = async (req, res) => {
  const sessions = await Session.find({}).sort({ createdAt: -1 });
  res.status(200).json(sessions);
};

//GET single session
const getSession = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, message: "Session does not exist" });
  }
  const session = await Session.findById(id);
  if (!session) {
    return res
      .status(400)
      .json({ status: false, message: "Session does not exist !" });
  }
  res.status(200).json(session);
};

//POST new session
const createSession = async (req, res) => {
  const { title, workoutType, days, workouts, completed } = req.body;
  try {
    const session = await Session.create({
      title,
      workoutType,
      days,
      workouts,
      completed,
    });
    res.status(200).json(session);
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

//DELETE single session
const deleteSession = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, message: "Session does not exist" });
  }
  const session = await Session.findOneAndDelete({ _id: id });
  if (!session) {
    return res
      .status(400)
      .json({ status: false, message: "Session does not exist !" });
  }
  res.status(200).json({ status: true, deletedSession: session });
};

//UPDATE single session : add workout
const updateSessionAddWorkout = async (req, res) => {
  const { id } = req.params;
  const { workout } = req.body;

  try {
    const session = await Session.findById(id);

    if (!session) {
      return res
        .status(404)
        .json({ status: false, message: "Session does not exist" });
    }
    const newWorkout = new Workout(workout);
    session.workouts.push(newWorkout);
    await session.save();

    res.status(200).json({ status: true, updatedSession: session });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

//UPDATE single session : complete status
const updateSessionSetComplete = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const session = await Session.findById(id);

    if (!session) {
      return res
        .status(404)
        .json({ status: false, message: "Session does not exist" });
    }

    session.completed = completed;
    await session.save();

    res.status(200).json({ status: true, updatedSession: session });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

//UPDATE single session : delete particular workout from session
const updateSessionDeleteWorkout = async (req, res) => {
  const { id } = req.params;
  const { workoutId } = req.body;

  try {
    const session = await Session.findById(id);

    if (!session) {
      return res
        .status(404)
        .json({ status: false, message: "Session does not exist" });
    }

    const workoutIndex = session.workouts.findIndex(
      (workout) => workout._id.toString() === workoutId
    );

    if (workoutIndex === -1) {
      return res.status(404).json({
        status: false,
        message: "Workout does not exist in the session",
      });
    }

    session.workouts.splice(workoutIndex, 1);
    await session.save();

    res.status(200).json({ status: true, updatedSession: session });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  createSession,
  getSessions,
  getSession,
  deleteSession,
  updateSessionAddWorkout,
  updateSessionSetComplete,
  updateSessionDeleteWorkout,
};
