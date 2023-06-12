const {
  ChildrenFormDetails,
} = require("../../models/children/childrenFormModel");
const mongoose = require("mongoose");

const getDetails = async (req, res) => {
  const details = await ChildrenFormDetails.find({}).sort({ createdAt: -1 });
  res.status(200).json(details);
};

const getDetail = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, message: "Form does not exist" });
  }
  const detail = await ChildrenFormDetails.findById(id);
  if (!detail) {
    return res
      .status(400)
      .json({ status: false, message: "Form does not exist !" });
  }
  res.status(200).json(detail);
};

//POST
const createDetail = async (req, res) => {
  const {
    firstName,
    lastName,
    parentGuardianName,
    relationToAdult,
    age,
    phoneNumber,
    vaccineType,
    vaccinated,
    code,
  } = req.body;
  try {
    const detail = await ChildrenFormDetails.create({
      firstName,
      lastName,
      parentGuardianName,
      relationToAdult,
      age,
      phoneNumber,
      vaccineType,
      vaccinated,
      code,
    });
    res.status(200).json(detail);
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

//DELETE
const deleteDetail = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, message: "Detail does not exist" });
  }
  const detail = await ChildrenFormDetails.findOneAndDelete({ _id: id });
  if (!detail) {
    return res
      .status(400)
      .json({ status: false, message: "Detail does not exist !" });
  }
  res.status(200).json({ status: true, deletedDetail: detail });
};

//UPDATE single detail : complete status
const updateDetailSetVaccinated = async (req, res) => {
  const { id } = req.params;
  const { vaccinated } = req.body;

  try {
    const detail = await ChildrenFormDetails.findById(id);

    if (!detail) {
      return res
        .status(404)
        .json({ status: false, message: "Detail does not exist" });
    }

    detail.vaccinated = vaccinated;
    await detail.save();

    res.status(200).json({ status: true, updatedDetail: detail });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  getDetails,
  getDetail,
  createDetail,
  deleteDetail,
  updateDetailSetVaccinated,
};
