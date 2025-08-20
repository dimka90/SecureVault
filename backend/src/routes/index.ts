import { Router } from "express";
import userRoutes from "./user";

const router = Router();

// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Digital Inheritance API is running",
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use("/users", userRoutes);

export default router;