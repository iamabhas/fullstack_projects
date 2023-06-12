const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

const admins = [
  { username: "infantAdmin", password: "password1" },
  { username: "childrenAdmin", password: "password2" },
  { username: "adultAdmin", password: "password3" },
];

Admin.countDocuments({})
  .then((count) => {
    if (count === 0) {
      return Admin.insertMany(admins);
    } else {
      console.log("Admin already exist in the collection");
    }
  })
  .then(() => {
    console.log("Admin inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting Admins:", error);
  });

module.exports = { Admin };
