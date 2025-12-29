import mongoose from "mongoose";
import logger from "../middleware/logger.js";

const connectDB = async () => {
  try {
    logger.info("Attempting to connect to MongoDB...", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 4000,
    });
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
