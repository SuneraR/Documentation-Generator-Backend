import { fetchFileContent } from "./fetchFileContent.js";
import { fetchRepoFiles } from "./fetchRepoFiles.js";
import { isSourceFile } from "./isSourceFile.js";
import { parseRepoUrl } from "./parseRepoUrl.js";

export async function extractRepoContext(repoUrl){
    const{owner,repo}=parseRepoUrl(repoUrl);

    const files=await fetchRepoFiles(owner,repo);
    const sourceFiles=files.filter(isSourceFile);

    const context=[];
    const MAX_FILE_SIZE = 50000; // 50KB max per file
    const MAX_FILES = 20; // Limit number of files
    const MAX_CONTEXT_LENGTH = 15000; // ~3000 tokens
    let totalLength = 0;

    for(const file of sourceFiles.slice(0, MAX_FILES)){
        if (totalLength >= MAX_CONTEXT_LENGTH) break;
        
        // Skip files that are too large
        if (file.size && file.size > MAX_FILE_SIZE) {
            continue;
        }
        
        const content=await fetchFileContent(file);
        const fileEntry = `FILE: ${file.path}\n${content}\n---\n`;
        
        // Only add if it won't exceed limit
        if (totalLength + fileEntry.length <= MAX_CONTEXT_LENGTH) {
            context.push(fileEntry);
            totalLength += fileEntry.length;
        }
    }
    
    console.log(`Extracted ${context.length} files, total length: ${totalLength}`);
    return context.join("\n");
}