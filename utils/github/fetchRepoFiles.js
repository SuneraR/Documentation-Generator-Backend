import fetch from "node-fetch";

const GITHUB_API = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function fetchRepoFiles(owner, repo, path = "") {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;

  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Documentation-Generator",
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch repository files: ${response.status} - ${errorText}`);
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
