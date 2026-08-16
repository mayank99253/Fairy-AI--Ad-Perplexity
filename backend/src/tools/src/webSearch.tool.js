import {TavilySearch} from '@langchain/tavily'
import { ENV } from '../../config/env.js'

export const webSearchTool = new TavilySearch({
    tavilyApiKey : ENV.TAVILY_API_KEY,
    maxResults : 3
})