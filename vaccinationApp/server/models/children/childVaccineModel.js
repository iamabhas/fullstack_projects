const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChildVaccineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const ChildVaccine = mongoose.model("ChildVaccine", ChildVaccineSchema);

const ChildVaccines = [
  { name: "Measles, Mumps, and Rubella (MMR) ChildVaccine" },
  { name: "Diphtheria, Tetanus, and Pertussis (DTaP) ChildVaccine" },
  { name: "Varicella (Chickenpox) Vaccine" },
];

ChildVaccine.countDocuments({})
  .then((count) => {
    if (count === 0) {
      return ChildVaccine.insertMany(ChildVaccines);
    } else {
      throw new Error("Child Vaccines already exist in the collection");
    }
  })
  .then(() => {
    console.log("Child Vaccines inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting Child Vaccines:", error);
  });
module.exports = { ChildVaccine };
