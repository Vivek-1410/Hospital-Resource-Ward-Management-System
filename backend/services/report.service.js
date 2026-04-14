const Patient = require("../models/Patient");
const Bed = require("../models/Bed");
const Ward = require("../models/Ward");

exports.getDashboardReport = async () => {
  const totalPatients = await Patient.countDocuments();
  const totalBeds = await Bed.countDocuments();
  const occupiedBeds = await Bed.countDocuments({ isOccupied: true });

  const wards = await Ward.find().populate("beds");

  return {
    totalPatients,
    totalBeds,
    occupiedBeds,
    wards
  };
};