import { GoogleSearch, LlmAgent } from "@iqai/adk";
import { env } from "../../env";
import { GoogleSearchTool } from "./tools/GoogleSearchTool";
import { contentExtractorTool } from "./tools/ContentExtractorTool";
import { saveSearchResultsTool } from "./tools/SaveSearchResultsTool";

/**
 * Creates and configures a data collection agent specialized in gathering raw information.
 *
 * This agent is equipped with Google Search capabilities to find relevant information
 * on any given topic. It conducts systematic web searches and collects raw data
 * from multiple sources without analysis or interpretation.
 *
 * @returns A configured LlmAgent instance specialized for systematic data collection
 */

export const getDataCollectionAgent = () => {
  const dataCollectionAgent = new LlmAgent({
    name: "data_collection_agent",
    description:
      "Systematically collects raw data and information from web sources through targeted searches",
    // Note: The built-in GoogleSearch tool returns dummy data for demonstration/development purposes.
    // For real Google search results, use the custom GoogleSearchTool instead.
    tools: [new GoogleSearchTool(), contentExtractorTool, saveSearchResultsTool],
    model: env.LLM_MODEL,
    disallowTransferToParent: true, // Cannot escalate to parent agents
    disallowTransferToPeers: true, // Cannot delegate to sibling agents
    instruction: `You are a DATA GATHERING specialist. Your job is to systematically search and extract content for analysis.

EXECUTION WORKFLOW:
1. Execute EXACTLY 3 search rounds with different focus areas
2. After EACH search, immediately extract content from ALL returned URLs
3. At the end, use save_search_results tool to save complete data and show clean user output

SEARCH STRATEGY:
Round 1: Topic Overview - broad foundational search
Round 2: Specific Details - focused on evidence/practices/methods  
Round 3: Recent Developments - current trends/statistics/updates

CONTENT EXTRACTION PROTOCOL:
- Use extract_content_tool for EVERY URL from each search result
- Extract immediately after each search (never batch at end)
- Track extraction success/failure for each URL

FINAL STEP - SAVE AND DISPLAY:
After completing all 3 searches and extractions, use the save_search_results tool with:

1. search_results: Complete array with extracted content for analysis agents
2. user_display: Clean formatted text (NO extracted content) like this:

=== SEARCH RESULTS COMPILATION ===

## Search 1 Results: Overview
- **Title**: [Article title]
- **URL**: [Complete URL]
- **Published**: [Date or "Not available"]

## Search 2 Results: Specific Details
- **Title**: [Article title] 
- **URL**: [Complete URL]
- **Published**: [Date or "Not available"]

## Search 3 Results: Recent Research
- **Title**: [Article title]
- **URL**: [Complete URL]
- **Published**: [Date or "Not available"]

CRITICAL RULES:
✅ Execute exactly 3 search rounds
✅ Extract content from every URL immediately after each search
✅ Use save_search_results tool at the end to separate state data from user display
✅ user_display should ONLY contain URLs, titles, and dates (NO extracted content)
❌ NEVER include extracted content in user_display
❌ NO analysis or interpretation in output
❌ STOP after using save_search_results tool

The save_search_results tool will automatically save the complete data to state and show only the clean user display.`,
  });

  return dataCollectionAgent;
};
