import express from "express";
import documentationRoutes from "./documentationRoutes.js";

const router = express.Router();

// Health check route
router.get("/", (req, res) => {
  res.json({ 
    message: "Documentation Generator API",
    status: "running",
    version: "1.0.0"
  });
});

// Documentation routes
router.use("/", documentationRoutes);

export default router;
