function decodeBase64(content) {
  return Buffer.from(content, "base64").toString("utf-8");
}

async function fetchFileContent(file) {
  const response = await fetch(file.url);
  if (!response.ok) {
    throw new Error("Failed to fetch file content");
  }
  const data = await response.json();

  return decodeBase64(data.content);
}
