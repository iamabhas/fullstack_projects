import { React } from "react";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="home-container">
      <h1>
        {" "}
        🏋️‍♂️ Welcome to the{" "}
        <span style={{ color: "rgb(29, 44, 133)" }}>
          Workout Tracker App
        </span>{" "}
        🏋️‍♀️
      </h1>
      <div style={{ fontSize: "1.1rem" }}>
        This app allows you to store your workouts in sessions . Each session
        can have multiple workouts and you can set 'sets' and 'reps' for each
        workout .
        <br />
        🔵 If you're a beginner and want to learn about different exercises ,
        the do and dont's in the gym...Click here 👉🏽{" "}
        <span
          style={{ color: "blue" }}
          onClick={() => {
            navigate("/learn");
          }}
        >
          🔗
        </span>{" "}
        <br />
        🔵 If you want to learn about the different features of this app...Click
        here 👉🏽{" "}
        <span
          style={{ color: "blue" }}
          onClick={() => {
            navigate("/about");
          }}
        >
          🔗
        </span>
      </div>
    </main>
  );
};

export default Home;
