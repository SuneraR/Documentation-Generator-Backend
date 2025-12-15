import { askDeepSeekAndGet } from "../utils/ollama.js";
import { parseRepoUrl } from "../utils/github/parseRepoUrl.js";
import { extractRepoContext } from "../utils/github/extractRepoContext.js";
import { isInvalidDocumentation } from "../utils/rejectBadOutput.js";


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
