import React, { useEffect, useState } from "react";
import SessionDetails from "../components/SessionDetails";
import SessionForm from "../components/SessionForm";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      const fetchSessions = async () => {
        const res = await fetch("http://localhost:3001/api/sessions/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await res.json();
        if (res.ok) {
          setSessions(json);
        }
      };

      fetchSessions();
    }
  }, []);

  const handleFilter = (option) => {
    setFilter(option);
  };

  const filteredSessions = sessions.filter((session) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Completed") {
      return session.completed;
    } else if (filter === "Uncompleted") {
      return !session.completed;
    }
    return false;
  });

  return (
    <main className="session-main-container">
      <SessionForm />
      <div className="sessions-container">
        <div className="filter-buttons">
          <button onClick={() => handleFilter("All")}>All</button>
          <button onClick={() => handleFilter("Completed")}>Completed</button>
          <button onClick={() => handleFilter("Uncompleted")}>
            Uncompleted
          </button>
        </div>
        {filteredSessions.length === 0 ? (
          <h1>No Sessions Added</h1>
        ) : (
          filteredSessions.map((session) => (
            <SessionDetails key={session._id} {...session} />
          ))
        )}
      </div>
    </main>
  );
};

export default Sessions;
