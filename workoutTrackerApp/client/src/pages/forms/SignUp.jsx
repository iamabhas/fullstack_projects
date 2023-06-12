import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("Email and password cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/signup",
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
      navigate("/");
      console.log("User signed up:", responseEmail);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form className="session-form signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
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
      <button>Sign up</button>
    </form>
  );
};

export default SignUp;
