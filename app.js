import express from "express";
import { askDeepSeekAndGet } from "./utils/ollama.js";
import { parseRepoUrl } from "./utils/github/parseRepoUrl.js";

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
  const { code } = req.body;

  const prompt = `
    You are an expert documentation generator.
    Read the following source code and generate clear Markdown documentation.

    Code:
    ${code}
  `;

  const output = await askDeepSeekAndGet(prompt);

  res.json({ docs: output });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
