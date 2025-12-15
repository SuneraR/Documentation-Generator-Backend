import express from "express";
import {
  generateDocumentation,
  downloadReadme,
} from "../controllers/gitHubDocumentationController.js";
import { generateZipDocument } from "../controllers/zipDocumentController.js";
import upload from "../config/multer.js";

const router = express.Router();



// Generate documentation from repository
router.post("/generate-docs", generateDocumentation);

router.post("/generate-zip-docs",upload.single('file'),generateZipDocument);

// Download generated documentation as README.md
router.post("/download-readme", downloadReadme);

export default router;
