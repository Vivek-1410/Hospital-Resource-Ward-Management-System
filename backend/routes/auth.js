const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ email, password });
  await user.save();

  res.json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

module.exports = router;
