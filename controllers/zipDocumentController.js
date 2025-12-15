import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";
import unzipper from "unzipper";
import { extractRepoContextFromFolder } from "../utils/zipFile/extractRepoContextFromFolder.js";
import { askDeepSeekAndGet } from "../utils/ollama.js";
import { cleanupFiles } from "../utils/cleanup.js";
import { isInvalidDocumentation } from "../utils/rejectBadOutput.js";

export const generateZipDocument = async (req, res) => {
  console.log("=== Starting ZIP upload processing ===");
  try {
    if (!req.file) {
      console.log("No file in request");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File received:", req.file.filename);
    const zipPath = req.file.path;
    // Remove .zip extension from filename for directory name
    const extractPath = path.join(
      "uploads",
      path.parse(req.file.filename).name
    );

    console.log("Zip path:", zipPath);
    console.log("Extract path:", extractPath);

    await fsExtra.ensureDir(extractPath);
    console.log("Extract directory created");

    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .on("close", async () => {
        console.log("Extraction completed");
        try {
          const repoContext = await extractRepoContextFromFolder(extractPath);

          console.log("Extracted context length:", repoContext.length);

          if (!repoContext || repoContext.trim().length === 0) {
            await fsExtra.remove(zipPath);
            await fsExtra.remove(extractPath);
            return res
              .status(400)
              .json({ error: "No valid source files found in zip" });
          }

          console.log("Calling AI to generate documentation...");
          const prompt = `You are a technical documentation writer. Your task is to analyze source code and write professional documentation.

CRITICAL INSTRUCTIONS:
1. Write documentation ONLY - do not ask questions or request clarification
2. Base all content strictly on the provided source code
3. Follow the exact structure provided below
4. Use proper Markdown formatting
5. Be concise and factual

Generate documentation in this EXACT structure:

---
# Project Documentation

## Overview
[Brief description of what this project does based on the code]

## Features
- [Feature 1 based on actual code]
- [Feature 2 based on actual code]
- [Feature 3 based on actual code]

## Technology Stack
**Languages:** [List programming languages used]
**Frameworks:** [List frameworks/libraries used]
**Dependencies:** [Key dependencies from package.json or imports]

## Project Structure
\`\`\`
[Show main directories and key files]
\`\`\`

## Installation
\`\`\`bash
# [Commands to install and set up the project]
\`\`\`

## Usage
[Explain how to use the project based on the code - entry points, main commands, etc.]

## API Endpoints
[If it's a web API, list the endpoints found in the code]
[If not applicable, write: "Not applicable - this is not a web API"]

## Configuration
[Environment variables or config files found in the code]
[If none found, write: "No configuration files detected"]

## Architecture
[Explain the main components and how they work together based on the code structure]

---

SOURCE CODE TO ANALYZE:
${repoContext}

Now generate the documentation following the structure above.`;

          let output = await askDeepSeekAndGet(prompt);

          if (isInvalidDocumentation(output)) {
            output = await askDeepSeekAndGet(`
          You FAILED the previous response.
          
          Generate DOCUMENTATION ONLY.
          Do NOT ask questions.
          Do NOT provide debugging help.
          Do NOT mention missing context.
          
          ${prompt}
          `);
          }
          console.log("AI documentation generated, length:", output.length);

          // Send response first
          res.json({ docs: output });
          // Cleanup after response is sent
          await cleanupFiles(zipPath, extractPath);
        } catch (error) {
          console.error("Error processing extracted files:", error);
          await fsExtra.remove(zipPath);
          await cleanupFiles(zipPath, extractPath);
          res
            .status(500)
            .json({ error: "Failed to generate documentation from zip" });
        }
      })
      .on("error", async (error) => {
        console.error("Error extracting zip:", error);
        await cleanupFiles(zipPath, extractPath);
        es.status(500).json({ error: "Failed to extract zip file" });
      });
  } catch (error) {
    console.error("Error in generateZipDocument:", error);
    res.status(500).json({ error: "Failed to process zip file" });
  }
};
