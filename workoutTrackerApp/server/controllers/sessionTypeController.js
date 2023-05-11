const { SessionType } = require("../models/sessionTypeModel");
const getSessionTypes = async (req, res) => {
  const sessionTypes = await SessionType.find({}).sort({ createdAt: -1 });
  if (!sessionTypes) {
    res.status(404).send({ status: false, message: "No such Session Type" });
  }
  res.status(200).send(sessionTypes);
};
module.exports = { getSessionTypes };
