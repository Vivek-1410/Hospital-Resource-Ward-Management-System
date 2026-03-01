const wardService = require("../services/ward.service");

exports.createWard = async (req, res) => {
  try {
    const ward = await wardService.createWard(req.body);
    res.status(201).json(ward);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllWards = async (req, res) => {
  try {
    const wards = await wardService.getAllWards();
    res.status(200).json(wards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};