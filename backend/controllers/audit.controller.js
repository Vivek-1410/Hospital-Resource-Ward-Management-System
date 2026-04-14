const auditService = require("../services/audit.service");

// GET TIMELINE
exports.getTimeline = async (req, res) => {
  try {
    const { patientId } = req.params;

    const events = await auditService.getPatientTimeline(patientId);

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};