import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email && user.token) {
      navigate("/home");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("Email and password cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email,
          password,
        }
      );

      const { email: responseEmail, token } = response.data;

      const userData = {
        email: responseEmail,
        token,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      console.log("User logged in:", responseEmail);
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form className="session-form login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email :</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <label>Password :</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
