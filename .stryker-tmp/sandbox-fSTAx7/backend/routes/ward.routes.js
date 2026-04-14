// @ts-nocheck
const express = require("express");
const router = express.Router();
const wardController = require("../controllers/ward.controller");

router.post("/", wardController.createWard);
router.get("/", wardController.getAllWards);

module.exports = router;