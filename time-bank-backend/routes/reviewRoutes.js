const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// =======================
// POST review
// =======================
router.post("/", async (req, res) => {
  try {
    const { userId, tutorId, rating, comment, reviewerName } = req.body;

    const review = new Review({
      userId,
      tutorId,
      rating,
      comment,
      reviewerName
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// =======================
// GET reviews
// =======================
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
// GET reviews for a specific user (dashboard)
router.get("/user/:id", async (req, res) => {
  try {
    const reviews = await Review.find({
      tutorId: req.params.id
    });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});
