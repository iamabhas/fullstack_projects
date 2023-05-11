import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import "../style.css";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-container">
      <div className="head">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h2>Workout Tracker App</h2>
        </Link>
        <DirectionsRunOutlinedIcon fontSize="large" htmlColor="white" />
        <FitnessCenterIcon fontSize="large" htmlColor="white" />
      </div>
      <div className="btn-container">
        <Button
          variant="outlined"
          style={{ color: "white" }}
          onClick={() => {
            navigate("/learn");
          }}
        >
          Learn
        </Button>
        <Button
          variant="outlined"
          style={{ color: "white" }}
          onClick={() => {
            navigate("/sessions");
          }}
        >
          Tracker
        </Button>
        <Button
          variant="outlined"
          style={{ color: "white" }}
          onClick={() => {
            navigate("/analytics");
          }}
        >
          Analytics
        </Button>
        <Button
          variant="outlined"
          style={{ color: "white" }}
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </Button>
        <Chip
          avatar={<Avatar>A</Avatar>}
          label="abhas@gmail"
          style={{ color: "white" }}
          color="primary"
          variant="outlined"
        />
        <Button variant="contained">Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
