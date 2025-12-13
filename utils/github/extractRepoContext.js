import { fetchFileContent } from "./fetchFileContent.js";
import { fetchRepoFiles } from "./fetchRepoFiles.js";
import { isSourceFile } from "./isSourceFile.js";
import { parseRepoUrl } from "./parseRepoUrl.js";

export async function extractRepoContext(repoUrl){
    const{owner,repo}=parseRepoUrl(repoUrl);

    const files=await fetchRepoFiles(owner,repo);
    const sourceFiles=files.filter(isSourceFile);

    const context=[];

    for(const file of sourceFiles){
        const content=await fetchFileContent(file);

        context.push(`FILE:${file.path} ${content}`);
    }
    return context.join("\n");
}