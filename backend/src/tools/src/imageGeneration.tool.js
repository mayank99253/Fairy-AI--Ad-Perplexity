// tools/imageGen.js
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const imageGenerationTool = tool(
    async ({ prompt }) => {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        // optional: fetch karke verify karo image aa rahi hai
        return url; // model ko URL wapas milega, jo frontend render kar dega
    },
    {
        name: "generate_image",
        description: "Generate an image from a text prompt when user asks to create/draw/generate an image.",
        schema: z.object({
            prompt: z.string().describe("Detailed description of the image to generate"),
        }),
    }
);
