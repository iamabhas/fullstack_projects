import React from "react";
import axios from "axios";

const WorkoutDetails = ({ _id, workoutName, reps, sets, paramId }) => {
  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.token) {
        await axios.patch(
          `http://localhost:3001/api/sessions/${paramId}/delete-workout`,
          {
            workoutId: _id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="session-detail">
      <div>
        <h2>{workoutName}</h2>
        <h3>{`Sets: ${sets}`}</h3>
        <h3>{`Reps: ${reps}`}</h3>
      </div>
      <img
        width="50"
        height="50"
        src="https://img.icons8.com/plasticine/100/filled-trash.png"
        alt="filled-trash"
        onClick={handleDelete}
      />
    </div>
  );
};

export default WorkoutDetails;
