const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/hospitaldb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hospital Resource & Ward Management System backend is running",
    service: "backend",
    port: 5000,
    timestamp: new Date()
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
