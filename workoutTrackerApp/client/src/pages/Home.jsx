import { React } from "react";
import Frontsvg from "../components/svg/Frontsvg";
import Backsvg from "../components/svg/Backsvg";
const Home = () => {
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
        workout.
        <br />
        <strong>Click on "About" to know more</strong>
      </div>
      <h2 style={{ color: "red" }}>
        Click on a body part you want to learn about and train
      </h2>
      <div className="svg-container">
        <Frontsvg />
        <Backsvg />
      </div>
    </main>
  );
};

export default Home;
