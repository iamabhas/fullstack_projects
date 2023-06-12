const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InfantVaccineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const InfantVaccine = mongoose.model("InfantVaccine", InfantVaccineSchema);

const InfantVaccines = [
  { name: "Inactivated Poliovirus Vaccine (IPV)" },
  { name: "Rotavirus Vaccine" },
  { name: "Pneumococcal Conjugate Vaccine (PCV)" },
];

InfantVaccine.countDocuments({})
  .then((count) => {
    if (count === 0) {
      return InfantVaccine.insertMany(InfantVaccines);
    } else {
      throw new Error("InfantVaccines already exist in the collection");
    }
  })
  .then(() => {
    console.log("InfantVaccines inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting InfantVaccines:", error);
  });

module.exports = { InfantVaccine };
