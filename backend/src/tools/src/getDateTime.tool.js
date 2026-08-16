import { DynamicStructuredTool } from "langchain";
import {z} from "zod";
import { getCurrentDateTime } from "../../utils/getCurrentDateTime.js";

export const getDateTimeTool = new DynamicStructuredTool({
    name : "get_current_datetime",
    description : "call this tool when user want current date/time (IST) , when user ask something related date , day , time",
    schema : z.object({}),
    func : async () => getCurrentDateTime()
})
