import { fetchFileContent } from "./fetchFileContent.js";
import { fetchRepoFiles } from "./fetchRepoFiles.js";
import { isSourceFile } from "./isSourceFile.js";
import { parseRepoUrl } from "./parseRepoUrl.js";

export async function extractRepoContext(repoUrl){
    const{owner,repo}=parseRepoUrl(repoUrl);

    const files=await fetchRepoFiles(owner,repo);
    const sourceFiles=files.filter(isSourceFile);

    const context=[];
    const MAX_FILE_SIZE = 100000; // 100KB max per file
    const MAX_FILES = 50; // Limit number of files

    for(const file of sourceFiles.slice(0, MAX_FILES)){
        // Skip files that are too large
        if (file.size && file.size > MAX_FILE_SIZE) {
            context.push(`FILE: ${file.path}\n[File too large, skipped]\n`);
            continue;
        }
        
        const content=await fetchFileContent(file);

        context.push(`FILE: ${file.path}\n${content}\n`);
    }
    return context.join("\n---\n");
}