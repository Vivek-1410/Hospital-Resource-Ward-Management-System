const Patient = require("../models/Patient");
const Bed = require("../models/Bed");
const auditService = require("./audit.service"); // ✅ ADD

// ✅ CREATE PATIENT
exports.createPatient = async (data) => {
  const patient = new Patient({
    name: data.name,
    age: data.age,
    gender: data.gender,
    contact: data.contact,
    address: data.address,
    diagnosis: data.diagnosis,
    doctor: data.doctor,
    status: "Admitted"
  });

  await patient.save();

  // 🔥 AUDIT LOG
  await auditService.createEvent({
    patient: patient._id,
    type: "ADMISSION",
    description: "Patient admitted",
    location: "Hospital",
    staff: "Admin"
  });

  return patient;
};

// ✅ GET ALL
exports.getAllPatients = async () => {
  return await Patient.find()
    .populate("bed")
    .populate("ward");
};

// ✅ DISCHARGE
exports.dischargePatient = async (patientId) => {
  const patient = await Patient.findById(patientId);

  if (!patient) throw new Error("Patient not found");

  const bed = await Bed.findById(patient.bed);

  if (bed) {
    bed.isOccupied = false;
    bed.assignedPatient = null;
    await bed.save();
  }

  patient.bed = null;
  patient.ward = null;
  patient.status = "Discharged";

  await patient.save();

  // 🔥 AUDIT LOG
  await auditService.createEvent({
    patient: patient._id,
    type: "DISCHARGE",
    description: "Patient discharged",
    location: "Hospital",
    staff: "Admin"
  });

  return patient;
};