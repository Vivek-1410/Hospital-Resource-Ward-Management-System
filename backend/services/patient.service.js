const Patient = require("../models/Patient");

exports.createPatient = async (data) => {
  const patient = new Patient(data);
  await patient.save();
  return patient;
};

const Bed = require("../models/Bed");

exports.createPatient = async (data) => {
  const { name, age, bedId } = data;

  const bed = await Bed.findById(bedId);
  if (!bed) {
    throw new Error("Bed not found");
  }

  if (bed.isOccupied) {
    throw new Error("Bed already occupied");
  }

  // Create patient
  const patient = new Patient({
    name,
    age,
    assignedBed: bedId,
    status: "Admitted"
  });

  await patient.save();

  // Update bed status
  bed.isOccupied = true;
  bed.assignedPatient = patient._id;
  await bed.save();

  return patient;
};

exports.getAllPatients = async () => {
  return await Patient.find().populate({
    path: "assignedBed",
    populate: { path: "ward" }
  });
};

exports.dischargePatient = async (patientId) => {
  const patient = await Patient.findById(patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const bed = await Bed.findById(patient.assignedBed);

  if (bed) {
    bed.isOccupied = false;
    bed.assignedPatient = null;
    await bed.save();
  }

  patient.status = "Discharged";
  await patient.save();

  return patient;
}