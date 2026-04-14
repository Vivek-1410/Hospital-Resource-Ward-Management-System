// @ts-nocheck
const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "ADMISSION",
        "BED_ASSIGNED",
        "TRANSFER",
        "STATUS_UPDATE",
        "DISCHARGE"
      ],
      required: true,
    },

    description: {
      type: String,
    },

    location: {
      type: String,
    },

    staff: {
      type: String, // later you can link to User
    },

    metadata: {
      type: Object, // flexible extra info
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditSchema);