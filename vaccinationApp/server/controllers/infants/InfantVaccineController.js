const { InfantVaccine } = require("../../models/infant/infantVaccineModel");
const getVaccines = async (req, res) => {
  const vaccineTypes = await InfantVaccine.find({}).sort({ createdAt: -1 });
  if (!vaccineTypes) {
    res.status(404).send({ status: false, message: "No Vaccines" });
  }
  res.status(200).send(vaccineTypes);
};
module.exports = { getVaccines };
