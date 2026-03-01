const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ward",
    },
    bed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bed",
    },
    status: {
      type: String,
      enum: ["Admitted", "Transferred", "Discharged"],
      default: "Admitted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);