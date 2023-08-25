import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState("");
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username == "" || password == "") {
      alert("Value Missing");
    } else {
      try {
        axios
          .post("http://localhost:3001/login", {
            username: username,
            password: password,
          })
          .then((res) => {
            console.log(res);
            if (res.data.status === "success") {
              setUsername("");
              setPassword("");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/login")
      .then((res) => {
        if (res.data.loggedIn) {
          setUserProfile(res.data.user[0].username);
        } else {
          setUserProfile("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
      <div style={{ color: "black" }}>User : {userProfile}</div>
    </div>
  );
};

export default Login;
