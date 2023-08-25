import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import jwt_decode from "jwt-decode";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/allusers");
        setUsers(res.data);
        console.log("data", res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [user]);

  const refreshTokens = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/refresh", {
        token: user.refreshToken,
      });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const axiosRefresh = axios.create();

  axiosRefresh.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const token = config.headers.authorization.split(" ")[1];
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp < currentDate.getTime() / 1000) {
        try {
          const data = await refreshTokens();
          config.headers["authorization"] = `Bearer ${data.accessToken}`;
        } catch (err) {
          console.log(err);
        }
      }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosRefresh.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/logout",
        { token: user.refreshToken },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="app-container">
      {user ? (
        <>
          <h1>Welcome to {user.isAdmin ? "Admin" : "User"} Dashboard</h1>
          {users.map((user) => {
            if (!user.isAdmin) {
              return (
                <Button
                  key={user.id}
                  variant="contained"
                  style={{ margin: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                >
                  {`Delete ${user.username}`}
                </Button>
              );
            }
          })}
          {error && (
            <article style={{ color: "red" }}>
              You are not allowed to delete this user !{" "}
            </article>
          )}
          {success && (
            <article style={{ color: "green" }}>
              User deleted successfully !
            </article>
          )}
          <div>
            <Button variant="contained" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
        </>
      )}
    </main>
  );
};

export default App;
