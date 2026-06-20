import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: String,
  category: String,
  rating: { type: Number, default: 0 },
});

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
