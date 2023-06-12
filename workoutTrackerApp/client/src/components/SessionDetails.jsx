import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SessionDetails = ({
  _id,
  title,
  workoutType,
  days,
  createdAt,
  completed,
}) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.token) {
        await axios.delete(`http://localhost:3001/api/sessions/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetComplete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.token) {
        await axios.patch(
          `http://localhost:3001/api/sessions/${id}/set-complete`,
          {
            completed: true,
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
  const handleSetNotComplete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.token) {
        await axios.patch(
          `http://localhost:3001/api/sessions/${id}/set-complete`,
          {
            completed: false,
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
  const formattedDate = new Date(createdAt).toISOString().split("T")[0];
  return (
    <div className="session-detail">
      <div>
        <h2>{`${title} (${workoutType})`}</h2>
        <p>
          <strong> Session For: </strong>
          {days}
        </p>
        {completed ? (
          <button
            style={{
              color: "white",
              outline: "none",
              background: "red",
              border: "none",
              borderRadius: "2px",
              fontSize: "20px",
            }}
            onClick={() => handleSetNotComplete(_id)}
          >
            Mark session as uncompleted
          </button>
        ) : (
          <button
            style={{
              color: "white",
              outline: "none",
              background: "green",
              border: "none",
              borderRadius: "2px",
              fontSize: "20px",
            }}
            onClick={() => handleSetComplete(_id)}
          >
            Mark session as completed
          </button>
        )}
        <p>{`Session Date : ${formattedDate}`}</p>
      </div>
      <div>
        {completed && (
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency/48/checked-2.png"
            alt="checked-2"
          />
        )}
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/visible--v1.png"
          alt="visible--v1"
          onClick={() => {
            navigate(`/sessions/${_id}`);
          }}
        />
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/plasticine/100/filled-trash.png"
          alt="filled-trash"
          onClick={() => {
            handleDelete(_id);
          }}
        />
      </div>
    </div>
  );
};

export default SessionDetails;
