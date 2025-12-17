import { askDeepSeekAndGet } from "../utils/ollama.js";
import { parseRepoUrl } from "../utils/github/parseRepoUrl.js";
import { extractRepoContext } from "../utils/github/extractRepoContext.js";
import { isInvalidDocumentation } from "../utils/rejectBadOutput.js";
import { documentationPrompt } from "../prompts/documentation.prompt.js";
import { InvalidDocumentationPrompt } from "../prompts/invalidDocumentation.prompt.js";


export const generateDocumentation = async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({ error: "Repository link is required" });
    }

    // Validate repository URL
    let parsed;
    try {
      parsed = parseRepoUrl(link);
    } catch (error) {
      return res.status(400).json({
        error: "Invalid GitHub repository URL",
        message: error.message,
      });
    }

    const repoContext = await extractRepoContext(link);

    const prompt = documentationPrompt({repoContext});

    let output = await askDeepSeekAndGet(prompt);

    if (isInvalidDocumentation(output)) {
      output = await askDeepSeekAndGet(InvalidDocumentationPrompt({ prompt }));
    }

    res.json({ docs: output });
  } catch (error) {
    console.error("Error generating documentation:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to generate documentation" });
  }
};

export const downloadReadme = (req, res) => {
  const { docs } = req.body;

  if (!docs || docs.trim() === "") {
    return res.status(400).json({ error: "No documentation provided" });
  }

  res.setHeader("Content-Type", "text/markdown");
  res.setHeader("Content-Disposition", "attachment; filename=README.md");
  res.send(docs);
};
