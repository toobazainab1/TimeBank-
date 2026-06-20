import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skill: String,
  category: String,
  role: String,
  duration: Number,
  description: String,
  status: { type: String, default: "pending" },
  credits: Number,
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;
