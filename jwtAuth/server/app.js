const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is Running..." });
});

app.use("/api", authRoutes);

app.use("/api", userRoutes);

app.listen(5000, () => {
  console.log("Server Listening on port 5000...");
});
