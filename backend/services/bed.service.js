const Bed = require("../models/Bed");
const Patient = require("../models/Patient");

exports.createBed = async (data) => {
  const bed = new Bed(data);
  await bed.save();
  return bed;
};

exports.getAllBeds = async () => {
  return await Bed.find().populate("ward").populate("assignedPatient");
};

exports.assignPatientToBed = async (bedId, patientId) => {
  const bed = await Bed.findById(bedId);
  if (!bed) {
    throw new Error("Bed not found");
  }

  if (bed.isOccupied) {
    throw new Error("Bed is already occupied");
  }

  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }


  bed.isOccupied = true;
  bed.assignedPatient = patient._id;
  await bed.save();

  patient.bed = bed._id;
  patient.ward = bed.ward;
  patient.status = "Admitted";
  await patient.save();

  return { message: "Patient assigned to bed successfully" };
};