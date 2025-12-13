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
  let buffer = "";

  for await (const chunk of response.body) {
    buffer += chunk.toString();
    const lines = buffer.split("\n");
    
    // Keep the last incomplete line in buffer
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const json = JSON.parse(line);

        if (json.response) {
          result += json.response;
        }

        if (json.done) {
          return result;
        }
      } catch (error) {
        // Skip invalid JSON lines
        console.warn("Skipping invalid JSON line:", line);
      }
      }
    }
  }
