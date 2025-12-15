

import fs from 'fs';
import path from 'path';

const ALLOWED_EXTENSIONS = [
  // Web
  ".js",
  ".ts",
  ".jsx",
  ".tsx",

  // Backend
  ".py",
  ".java",
  ".php",
  ".go",
  ".rs",

  // Mobile / Desktop
  ".kt",
  ".swift",
  ".dart",

  // Data / Config
  ".json",
  ".yml",
  ".yaml",

  // Docs (optional)
  ".md",
];

export async function extractRepoContextFromFolder(dir) {
  let context = "";

  async function walk(folder) {
    const files = await fs.promises.readdir(folder);

    for (const file of files) {
      const fullPath = path.join(folder, file);
      const stat = await fs.promises.stat(fullPath);

      if (stat.isDirectory()) {
        if (file === "node_modules" || file.startsWith(".")) continue;
        await walk(fullPath);
      } else {
        if (ALLOWED_EXTENSIONS.includes(path.extname(file))) {
          const content = await fs.promises.readFile(fullPath, "utf-8");
          context += `\n\n// FILE: ${fullPath}\n${content}`;
        }
      }
    }
  }

  await walk(dir);
  return context.slice(0, 120000); // prevent token overload
}
