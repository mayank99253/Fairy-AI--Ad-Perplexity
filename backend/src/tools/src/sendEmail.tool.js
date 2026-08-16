// tool for the sending email

import { tool } from "langchain";
import { z } from "zod";
import { sendEmail } from "../../services/mail.service.js"

export const emailTool = tool(
    sendEmail, {
    name: "emailTool",
    description: `Use this tool to send an email. If the user does not provide the exact body/content, 
compose a complete, professional, well-formatted email yourself based on the subject and context. 
Never send a single short line — always write a proper structured email with greeting, body, and closing.`,
    schema: z.object({
        to: z.string().describe("The recipient's email address"),
        subject: z.string().describe("The subject of the email"),
        text: z.string().optional().describe("Plain text content of the email"),
        html: z.string().describe("The HTML content of the email"),
    })
}
)