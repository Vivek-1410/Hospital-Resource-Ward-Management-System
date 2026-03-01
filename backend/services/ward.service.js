const Ward = require("../models/Ward");

exports.createWard = async (data) => {
  const ward = new Ward(data);
  await ward.save();
  return ward;
};

exports.getAllWards = async () => {
  return await Ward.find();
};