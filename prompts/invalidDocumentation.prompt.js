export const InvalidDocumentationPrompt = ({ prompt }) => {
  `You FAILED the previous response.
          
          Generate DOCUMENTATION ONLY.
          Do NOT ask questions.
          Do NOT provide debugging help.
          Do NOT mention missing context.
          
          ${prompt}`;
};
