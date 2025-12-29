import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1]; // Get token from "Bearer <token>"
    if (!token)
      return res.status(401).json({ error: "Authorization token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ error: "Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: " + error.message });
  }
};

export default auth;
