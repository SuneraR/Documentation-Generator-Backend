import "dotenv/config";
import express from "express";
import { askDeepSeekAndGet } from "./utils/ollama.js";
import { parseRepoUrl } from "./utils/github/parseRepoUrl.js";
import { extractRepoContext } from "./utils/github/extractRepoContext.js";
import { isInvalidDocumentation } from "./utils/rejectBadOutput.js";


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/check", (req, res) => {
  const { link } = req.body;
  const parsed = parseRepoUrl(link);

  res.json({ parsed });
});

app.post("/generate-docs", async (req, res) => {
  const { link } = req.body;

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
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
