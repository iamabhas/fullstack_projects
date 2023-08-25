import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
const Signup = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameReg == "" || passwordReg == "") {
      alert("Value Missing");
    } else {
      try {
        axios
          .post("http://localhost:3001/signup", {
            username: usernameReg,
            password: passwordReg,
          })
          .then((res) => {
            console.log(res);
          });

        setUsernameReg("");
        setPasswordReg("");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up Form</h1>
        <label>Username</label>
        <input
          type="text"
          value={usernameReg}
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="password"
          value={passwordReg}
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />

        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
