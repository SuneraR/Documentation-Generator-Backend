import fetch from "node-fetch";

export async function askDeepSeekAndGet(prompt) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "deepseek-coder",
      prompt,
      stream: true
    })
  });

  let result = "";

  for await (const chunk of response.body) {
    const lines = chunk.toString().split("\n");

    for (const line of lines) {
      if (!line.trim()) continue;

      const json = JSON.parse(line);

      if (json.response) {
        result += json.response;
      }

      if (json.done) {
        return result;
      }
    }
  }
}