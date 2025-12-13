const INVALID_PHRASES = [
  "it seems like",
  "you are having trouble",
  "please provide more details",
  "I don’t have access",
  "based on the information given",
  "could you clarify",
  "might be an issue",
  "debug",
  "error",
  "problem"
];

export function isInvalidDocumentation(text) {
  return INVALID_PHRASES.some(p =>
    text.toLowerCase().includes(p)
  );
}
