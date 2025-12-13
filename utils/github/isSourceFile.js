const SOURCE_EXTENSIONS = [
  // Web
  ".js", ".ts", ".jsx", ".tsx",

  // Backend
  ".py", ".java", ".php", ".go", ".rs",

  // Mobile / Desktop
  ".kt", ".swift", ".dart",

  // Data / Config
  ".json", ".yml", ".yaml",

  // Docs (optional)
  ".md"
];

const EXCLUDED_FILES = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  ".npmrc",
  "npm-debug.log"
];

export function isSourceFile(file) {
  const name = file.name.toLowerCase();
  
  // Exclude specific large files
  if (EXCLUDED_FILES.includes(name)) {
    return false;
  }
  
  return SOURCE_EXTENSIONS.some(ext => name.endsWith(ext));
}
