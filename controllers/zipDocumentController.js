import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";
import unzipper from "unzipper";
import { extractRepoContextFromFolder } from "../utils/zipFile/extractRepoContextFromFolder.js";
import { askDeepSeekAndGet } from "../utils/ollama.js";
import { cleanupFiles } from "../utils/cleanup.js";
import { isInvalidDocumentation } from "../utils/rejectBadOutput.js";
import { InvalidDocumentationPrompt } from "../prompts/invalidDocumentation.prompt.js";

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

          const prompt = documentationPrompt(repoContext);

          let output = await askDeepSeekAndGet(prompt);

          if (isInvalidDocumentation(output)) {
            output = await askDeepSeekAndGet(InvalidDocumentationPrompt(prompt));
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
