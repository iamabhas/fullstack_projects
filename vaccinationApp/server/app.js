require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Routes
const infantFormRoutes = require("./routes/infants/InfantFormDetails");
const childrenFormRoutes = require("./routes/children/ChildrenFormDetails");
const adultFormRoutes = require("./routes/adults/AdultFromDetails");

const infantVaccineRoutes = require("./routes/infants/InfantVaccine");
const childrenVaccineRoutes = require("./routes/children/ChildrenVaccine");
const adultVaccineRoutes = require("./routes/adults/AdultVaccine");

const adminRoutes = require("./routes/adminRoute");

const app = express();

const logger = (req, res, next) => {
  console.log(req.path, req.method);
  next();
};

//middleware
app.use([logger]);
app.use(express.json());
app.use(cors());

//Route
app.use("/api/details", [
  infantFormRoutes,
  childrenFormRoutes,
  adultFormRoutes,
]);
app.use("/api", [
  infantVaccineRoutes,
  childrenVaccineRoutes,
  adultVaccineRoutes,
  adminRoutes,
]);

app.get("/", (req, res) => {
  res.json({ status: true, message: "Vaccine Registration App" });
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
