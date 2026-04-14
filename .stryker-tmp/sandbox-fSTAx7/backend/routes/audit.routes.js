// @ts-nocheck
const express = require("express");
const router = express.Router();
const auditController = require("../controllers/audit.controller");

// GET patient timeline
router.get("/:patientId", auditController.getTimeline);

module.exports = router;