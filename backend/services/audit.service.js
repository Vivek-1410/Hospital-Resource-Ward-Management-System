const AuditLog = require("../models/audit.model");

// CREATE EVENT
exports.createEvent = async (data) => {
  const event = new AuditLog(data);
  await event.save();
  return event;
};

// GET PATIENT TIMELINE
exports.getPatientTimeline = async (patientId) => {
  return await AuditLog.find({ patient: patientId })
    .sort({ createdAt: 1 }); // chronological
};