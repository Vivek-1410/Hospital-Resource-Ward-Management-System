const express = require("express");
const router = express.Router();
const controller = require("../controllers/equipment.controller");

router.post("/equipment", controller.addEquipment);
router.get("/equipment", controller.getEquipment);
router.put("/equipment/:id", controller.updateStatus);

module.exports = router;