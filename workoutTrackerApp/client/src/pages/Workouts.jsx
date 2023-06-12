import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutDetails from "../components/WorkoutDetails";
const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      const fetchWorkouts = async () => {
        const res = await fetch(
          `http://localhost:3001/api/sessions/${id}/workouts`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await res.json();
        if (res.ok) {
          setWorkouts(json);
        }
      };

      fetchWorkouts();
    }
  }, [id]);
  return (
    <main className="session-main-container">
      <WorkoutForm sessionId={id} />
      <div className="sessions-container">
        {workouts && workouts.length === 0 ? (
          <h1>No Workouts Added</h1>
        ) : (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} {...workout} paramId={id} />
          ))
        )}
      </div>
    </main>
  );
};

export default Workouts;
