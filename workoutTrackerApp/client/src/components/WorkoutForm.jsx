import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

const WorkoutForm = ({ sessionId }) => {
  const [workout, setWorkout] = useState({
    workoutName: "",
    sets: "",
    reps: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!workout.workoutName || !workout.reps || !workout.sets) {
      alert("Something is missing in the form!");
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.token) {
          const { workoutName, reps, sets } = workout;
          const payload = {
            workout: {
              workoutName,
              reps: Number(reps),
              sets: Number(sets),
            },
          };

          await axios.patch(
            `http://localhost:3001/api/sessions/${sessionId}/add-workout`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          window.location.reload();
        }
      } catch (error) {
        console.error("Error occurred while submitting workout", error);
      }
    }
  };

  return (
    <form className="session-form">
      <h2>Add Workouts</h2>
      <label>
        <h3>Workout Name:</h3>
      </label>
      <input
        type="text"
        onChange={handleChange}
        name="workoutName"
        placeholder="workoutName"
        style={{ fontSize: "20px" }}
        value={workout.workoutName}
      />
      <br />
      <label>
        <h3>Sets:</h3>
      </label>
      <input
        type="number"
        onChange={handleChange}
        name="sets"
        placeholder="Sets"
        style={{ fontSize: "20px" }}
        value={workout.sets}
        min="0"
      />
      <br />
      <label>
        <h3>Reps:</h3>
      </label>
      <input
        type="number"
        onChange={handleChange}
        name="reps"
        placeholder="Reps"
        style={{ fontSize: "20px" }}
        value={workout.reps}
        min="0"
      />
      <br />
      <Button variant="contained" onClick={handleClick}>
        Add Workout
      </Button>
    </form>
  );
};

export default WorkoutForm;
