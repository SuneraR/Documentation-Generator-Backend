import fetch from "node-fetch";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function decodeBase64(content) {
  return Buffer.from(content, "base64").toString("utf-8");
}

export async function fetchFileContent(file) {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Documentation-Generator",
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(file.url, { headers });
  if (!response.ok) {
    throw new Error("Failed to fetch file content");
  }
  const data = await response.json();

  return decodeBase64(data.content);
}
