import express from "express";
import cors from "cors";
import logger from "./middleware/logger.js";
import User from "./models/User.js";
import Skill from "./models/Skill.js";
import Session from "./models/Session.js";
import Review from "./models/Review.js";
import connectDB from "./config/database.js";
import Contact from "./models/Contact.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import auth from "./middleware/auth.js";
const envFile =
  process.env.NODE_ENV && process.env.NODE_ENV !== "development"
    ? `.env.${process.env.NODE_ENV}`
    : ".env";
dotenv.config({ path: envFile, override: true });

logger.info(`Using environment file: ${envFile}`);

const app = express();

app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.get("/health", (req, res) => res.send("Backend server is running"));

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role, category, reason, age, phone } =
      req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = new User({
      name,
      email,
      password,
      role,
      category,
      reason,
      age,
      phone,
    });
    await user.save();

    // Create JWT token after signup
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/users", auth, async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.user?._id }).select(
      "-password"
    );
    res.json(users);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/users/credits", auth, async (req, res) => {
  try {
    const { credits } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { credits },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/skills", auth, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/skills", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/sessions", auth, async (req, res) => {
  try {
    const session = new Session({
      ...req.body,
      userId: req.user._id,
    });
    await session.save();

    if (session.userId && session.credits) {
      await User.findByIdAndUpdate(session.userId, {
        $inc: { credits: session.credits },
      });
    }
    if (session.tutorId && session.credits) {
      await User.findByIdAndUpdate(session.tutorId, {
        $inc: { credits: session.credits },
      });
    }

    res.status(201).json(session);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sessions", auth, async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    const sessions = await Session.find({ userId });
    res.json(sessions);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/reviews", auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    logger.info("Contact form submission received:", req.body);
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message received successfully" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

connectDB()
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
