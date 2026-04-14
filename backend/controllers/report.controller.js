const reportService = require("../services/report.service");

exports.getReport = async (req, res) => {
  try {
    const data = await reportService.getDashboardReport();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error generating report" });
  }
};