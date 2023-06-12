const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  workoutName: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
});

const sessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    workoutType: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    workouts: {
      type: [workoutSchema],
      default: [],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);
const Session = mongoose.model("Session", sessionSchema);

module.exports = { Workout, Session };
