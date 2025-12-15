import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { cleanupOldUploads } from "./utils/cleanup.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Something went wrong!",
    message: err.message 
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // Clean up old uploads on startup
  await cleanupOldUploads();
  
  // Schedule periodic cleanup every hour
  setInterval(cleanupOldUploads, 60 * 60 * 1000);
});
