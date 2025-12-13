import fetch from "node-fetch";

const GITHUB_API = "https://api.github.com";

async function fetchRepoFiles(owner, repo, path = "") {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      //Authorization: `token ${GITHUB_TOKEN}` // If authentication is needed
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch repository files");
  }

  const data = await response.json();
  let files = [];

  for (const item of data) {
    if (item.type === "file") {
      files.push(item);
    }
    if (item.type === "dir") {
      const subFiles = await fetchRepoFiles(owner, repo, item.path);
      files = files.concat(subFiles);
    }
  }
  return files;
}
