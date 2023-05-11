require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

//Routes
const sessionRoutes = require("./routes/sessions");
const workoutRoutes = require("./routes/workouts");
const sessionTypeRoutes = require("./routes/sessionType");

const app = express();

const logger = (req, res, next) => {
  console.log(req.path, req.method);
  next();
};

//middleware
app.use([logger]);
app.use(express.json());

//Route
app.use("/api/sessions", [sessionRoutes, workoutRoutes]);
app.use("/api", sessionTypeRoutes);

app.get("/", (req, res) => {
  res.json({ status: true, message: "Workout Tracker App" });
});

const port = process.env.PORT || 5000;

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`db connection success | Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
