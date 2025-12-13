export function parseRepoUrl(repoUrl) {
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?$/);
  if (!match) {
    throw new Error("Invalid GitHub repository URl");
  }

  return {
    owner: match[1],
    repo: match[2].replace(".git", ""),
  };
}
