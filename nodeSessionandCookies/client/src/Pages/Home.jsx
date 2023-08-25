import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="home-container">
      <h1>Jwt Authentication</h1>
      <Stack spacing={2} direction="row">
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
      </Stack>
    </main>
  );
};

export default Home;
