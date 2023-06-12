const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Either Email or Password is missing !");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const emailAlreadyExists = await this.findOne({ email });
  if (emailAlreadyExists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//static login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Either Email or Password is missing !");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid Email !");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid Password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
