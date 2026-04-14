const express = require("express");
const router = express.Router();
const controller = require("../controllers/report.controller");

router.get("/reports", controller.getReport);

module.exports = router;