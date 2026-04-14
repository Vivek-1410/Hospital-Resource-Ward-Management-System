const equipmentService = require("../services/equipment.service");

exports.addEquipment = async (req, res) => {
  try {
    const eq = await equipmentService.createEquipment(req.body);
    res.json({ msg: "Equipment added", eq });
  } catch (err) {
    res.status(500).json({ msg: "Error adding equipment" });
  }
};

exports.getEquipment = async (req, res) => {
  const data = await equipmentService.getAllEquipment();
  res.json(data);
};

exports.updateStatus = async (req, res) => {
  const updated = await equipmentService.updateEquipmentStatus(
    req.params.id,
    req.body.status
  );
  res.json(updated);
};