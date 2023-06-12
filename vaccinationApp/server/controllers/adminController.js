const { Admin } = require("../models/adminModel/adminModel");
const getAdmins = async (req, res) => {
  const admins = await Admin.find({});
  if (!admins) {
    res.status(404).send({ status: false, message: "No Admins" });
  }
  res.status(200).send(admins);
};
module.exports = { getAdmins };
