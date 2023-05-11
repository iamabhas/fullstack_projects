const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionTypeSchema = new Schema({
  sessionTypeName: {
    type: String,
    required: true,
  },
});

// WorkoutType model
const SessionType = mongoose.model("SessionType", sessionTypeSchema);

// Array of workout types
const sessionTypes = [
  { sessionTypeName: "Chest Day" },
  { sessionTypeName: "Tricep Day" },
  { sessionTypeName: "Shoulder Day" },
  { sessionTypeName: "Back and Traps Day" },
  { sessionTypeName: "Bicep Day" },
  { sessionTypeName: "Leg Day" },
  { sessionTypeName: "Push Day" },
  { sessionTypeName: "Pull Day" },
  { sessionTypeName: "Chest and Tricep Day" },
  { sessionTypeName: "Back/Traps and Bicep Day" },
  { sessionTypeName: "Shoulder and Leg Day" },
  { sessionTypeName: "Custom Day" },
];

// Insert workout types
SessionType.insertMany(sessionTypes)
  .then(() => {
    console.log("Workout types inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting workout types:", error);
  });

module.exports = { SessionType };
