const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    parentGuardianName: {
      type: String,
      required: true,
    },
    relationToAdult: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    vaccineType: {
      type: String,
      required: true,
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const InfantFormDetails = mongoose.model("InfantFormDetails", formSchema);

module.exports = { InfantFormDetails };
