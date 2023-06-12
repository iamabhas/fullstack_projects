import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

const SessionForm = () => {
  const [session, setSession] = useState({
    title: "",
    workoutType: "",
    days: "",
  });
  const [sessionTypes, setSessionTypes] = useState([]);

  useEffect(() => {
    const fetchSessionTypes = async () => {
      const res = await fetch("http://localhost:3001/api/sessionTypes/");
      const json = await res.json();
      if (res.ok) {
        setSessionTypes(json);
      }
    };
    fetchSessionTypes();
  }, []);

  const handleChange = (event) => {
    setSession((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!session.title || !session.workoutType || !session.days) {
      alert("Something is missing in the form!");
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.token) {
          await axios.post("http://localhost:3001/api/sessions", session, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          window.location.reload();
        }
      } catch (error) {
        console.error("Error occurred while submitting sessions", error);
      }
    }
  };

  return (
    <form className="session-form">
      <h2>Add new Session</h2>
      <label>
        {" "}
        <h3>Session Title :</h3>{" "}
      </label>
      <input
        type="text"
        onChange={handleChange}
        name="title"
        placeholder="Title"
        style={{ fontSize: "20px" }}
        value={session.title}
      />
      <br />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "1rem" }}>
          <label>
            {" "}
            <h3>Select Day:</h3>{" "}
          </label>
          <select name="days" id="days" onChange={handleChange} required>
            <option selected="disabled" value="">
              Select a day
            </option>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>

        <div>
          <label>
            {" "}
            <h3>Select Session Type:</h3>{" "}
          </label>
          <select
            name="workoutType"
            id="workoutType"
            onChange={handleChange}
            required
          >
            <option selected="disabled" value="">
              Select Session Type
            </option>
            {sessionTypes.map((sessionType) => {
              return (
                <option
                  value={sessionType.sessionTypeName}
                  key={sessionType._id}
                >
                  {sessionType.sessionTypeName}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <Button variant="contained" onClick={handleClick}>
        Add Session
      </Button>
    </form>
  );
};

export default SessionForm;
