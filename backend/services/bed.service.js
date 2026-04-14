const Bed = require("../models/Bed");
const Patient = require("../models/Patient");
const auditService = require("./audit.service"); 
const { canAssignBed } = require("../utils/bedLogic");

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
  const patient = await Patient.findById(patientId);

  const result = canAssignBed(bed, patient);

  if (!result.allowed) {
    throw new Error(result.reason);
  }

  bed.isOccupied = true;
  bed.assignedPatient = patient._id;
  await bed.save();

  patient.bed = bed._id;
  patient.ward = bed.ward;
  patient.status = "Admitted";
  await patient.save();

  return { message: "Patient assigned successfully" };
};