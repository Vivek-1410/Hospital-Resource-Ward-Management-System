const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const patientController = require("../controllers/patient.controller");

router.post("/", authMiddleware, patientController.createPatient);
router.get("/", authMiddleware, patientController.getAllPatients);
router.patch("/discharge/:id", authMiddleware, patientController.dischargePatient);

module.exports = router;