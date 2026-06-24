import * as z from 'zod'
import {createAgent, tool} from "langchain"
import { sendEmail } from './mail.services.js'
import { model } from './ai.service.js'

const emailtool = tool(
    sendEmail,{
        name : "emailtool",
        description:"use this tool to send email",
        schema: z.object({
            to: z.object().describe("the recepients email address"),
            html :z.object().describe("the HTML content of email"),
            subject:z.object().describe("the subject of email")
        })
    }
)

export const agent = createAgent({model , tool:[emailtool]})


