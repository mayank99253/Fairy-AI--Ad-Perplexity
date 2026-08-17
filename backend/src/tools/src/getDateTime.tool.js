import { DynamicStructuredTool } from "langchain";
import {z} from "zod";

export function getCurrentDateTime() {
    const now = new Date();

    const options = {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }

    return now.toLocaleString('en-IN', options);
}

export const getDateTimeTool = new DynamicStructuredTool({
    name : "get_current_datetime",
    description : "call this tool when user want current date/time (IST) , when user ask something related date , day , time",
    schema : z.object({}),
    func : async () => getCurrentDateTime()
})
