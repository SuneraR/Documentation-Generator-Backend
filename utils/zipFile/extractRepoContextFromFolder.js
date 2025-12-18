
import fs from 'fs';
import path from 'path';

const ALLOWED_EXTENSIONS = [
  // Web
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".css",
  ".scss",
  ".html",

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

  // Config
  ".yml",
  ".yaml",

  // Docs (optional)
  ".md",
];

const EXCLUDED_FILES = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  ".npmrc",
  "npm-debug.log",
];

const MAX_FILE_SIZE = 50000; // 50KB per file
const MAX_CONTEXT_LENGTH = 15000; // ~3000 tokens (4 chars per token avg)

export async function extractRepoContextFromFolder(dir) {
  let context = "";
  let fileCount = 0;
  const MAX_FILES = 20;

  async function walk(folder) {
    if (fileCount >= MAX_FILES || context.length >= MAX_CONTEXT_LENGTH) return;
    
    const files = await fs.promises.readdir(folder);

    for (const file of files) {
      if (fileCount >= MAX_FILES) break;
      
      const fullPath = path.join(folder, file);
      const stat = await fs.promises.stat(fullPath);

      if (stat.isDirectory()) {
        if (file === "node_modules" || file.startsWith(".") || file === "dist" || file === "build") continue;
        await walk(fullPath);
      } else {
        // Skip excluded files
        if (EXCLUDED_FILES.includes(file)) continue;
        
        // Skip files that are too large
        if (stat.size > MAX_FILE_SIZE) continue;
        
        if (ALLOWED_EXTENSIONS.includes(path.extname(file))) {
          if (context.length >= MAX_CONTEXT_LENGTH) break;
          
          const content = await fs.promises.readFile(fullPath, "utf-8");
          const relativePath = path.relative(dir, fullPath);
          const fileEntry = `\n---\nFILE: ${relativePath}\n---\n${content}\n`;
          
          // Only add if it won't exceed limit
          if (context.length + fileEntry.length <= MAX_CONTEXT_LENGTH) {
            context += fileEntry;
            fileCount++;
          }
        }
      }
    }
  }

  await walk(dir);
  console.log(`Extracted ${fileCount} files, total context length: ${context.length}`);
  return context;
}
