import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tutorId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating:       { type: Number, required: true, min: 1, max: 5 },
    comment:      { type: String, default: "" },
    reviewerName: { type: String, default: "Anonymous" },
  },
  { timestamps: true }   // ← adds createdAt and updatedAt automatically
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;