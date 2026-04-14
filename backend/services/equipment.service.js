const Equipment = require("../models/equipment.model");

exports.createEquipment = async (data) => {
  return await Equipment.create(data);
};

exports.getAllEquipment = async () => {
  return await Equipment.find().populate("wardId");
};

exports.updateEquipmentStatus = async (id, status) => {
  return await Equipment.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};