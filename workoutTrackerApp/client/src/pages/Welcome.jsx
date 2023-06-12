import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
const Welcome = () => {
  const navigate = useNavigate();
  return (
    <main className="welcome-container">
      <h1>Welcome to Workout Tracker App</h1>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
      </div>
    </main>
  );
};

export default Welcome;
