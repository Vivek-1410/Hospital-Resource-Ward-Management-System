const bedService = require("../services/bed.service");

exports.createBed = async (req, res) => {
  try {
    const bed = await bedService.createBed(req.body);
    res.status(201).json(bed);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBeds = async (req, res) => {
  try {
    const beds = await bedService.getAllBeds();
    res.status(200).json(beds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignPatientToBed = async (req, res) => {
  try {
    const result = await bedService.assignPatientToBed(
      req.params.bedId,
      req.params.patientId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};