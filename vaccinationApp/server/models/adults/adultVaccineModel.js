const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdultVaccineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const AdultVaccine = mongoose.model("AdultVaccine", AdultVaccineSchema);

const AdultVaccines = [
  { name: "Influenza Vaccine" },
  { name: "Tdap/Td Vaccine" },
  { name: "Hepatitis B Vaccine" },
];

AdultVaccine.countDocuments({})
  .then((count) => {
    if (count === 0) {
      return AdultVaccine.insertMany(AdultVaccines);
    } else {
      throw new Error("Adult Vaccines already exist in the collection");
    }
  })
  .then(() => {
    console.log("Adult Vaccines inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting Adult Vaccines:", error);
  });

module.exports = { AdultVaccine };
