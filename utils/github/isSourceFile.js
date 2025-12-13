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

export function isSourceFile(file) {
  const name = file.name.toLowerCase();
  return SOURCE_EXTENSIONS.some(ext => name.endsWith(ext));
}
