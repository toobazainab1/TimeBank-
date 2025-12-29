const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST user from React
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
