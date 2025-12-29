import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String,
  reviewerName: String,
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
