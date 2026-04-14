const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Available", "In Use", "Maintenance"], 
    default: "Available" 
  },
  location: { type: String },
  wardId: { type: mongoose.Schema.Types.ObjectId, ref: "Ward" },
  battery: { type: Number, default: null },
  lastPing: { type: String, default: "Just now" }
}, { timestamps: true });

module.exports = mongoose.model("Equipment", equipmentSchema);