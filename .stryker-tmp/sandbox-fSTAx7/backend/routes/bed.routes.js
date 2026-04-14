// @ts-nocheck
const express = require("express");
const router = express.Router();
const bedController = require("../controllers/bed.controller");

router.post("/", bedController.createBed);
router.get("/", bedController.getAllBeds);
router.patch("/assign/:bedId/:patientId", bedController.assignPatientToBed);

module.exports = router;