const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());


const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const patientRoutes = require("./routes/patient.routes");
app.use("/api/patients", patientRoutes);

const wardRoutes = require("./routes/ward.routes");
app.use("/api/wards", wardRoutes);

const bedRoutes = require("./routes/bed.routes");
app.use("/api/beds", bedRoutes);

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hospital Resource & Ward Management System backend is running",
    service: "backend",
    port: process.env.PORT || 5000,
    timestamp: new Date()
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});