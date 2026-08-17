import { getDateTimeTool } from "./src/getDateTime.tool.js";
import { imageGenerationTool } from "./src/imageGeneration.tool.js";
import { emailTool } from "./src/sendEmail.tool.js";
import { webSearchTool } from "./src/webSearch.tool.js";

export const allTools = [
    emailTool,
    getDateTimeTool,
    webSearchTool,
    imageGenerationTool,
]