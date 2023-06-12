import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import "../style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [avatarLabel, setAvatarLabel] = useState("");
  const user = localStorage.getItem("user");
  const isLoggedIn = !!user;

  useEffect(() => {
    if (isLoggedIn) {
      const userData = JSON.parse(user);
      setUserEmail(userData.email);

      const firstLetter = userData.email.charAt(0).toUpperCase();
      setAvatarLabel(firstLetter);
    }
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="nav-container">
      <div className="head">
        <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
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
            navigate("/about");
          }}
        >
          About
        </Button>
        {isLoggedIn && (
          <Button
            variant="outlined"
            style={{ color: "white" }}
            onClick={() => {
              navigate("/sessions");
            }}
          >
            Tracker
          </Button>
        )}
        <Button
          variant="outlined"
          style={{ color: "white" }}
          onClick={() => {
            navigate("/learn");
          }}
        >
          Learn
        </Button>
        {isLoggedIn && (
          <>
            <Chip
              avatar={<Avatar>{avatarLabel}</Avatar>}
              label={userEmail}
              style={{ color: "white" }}
              color="primary"
              variant="outlined"
            />
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
