import { GoogleSearch, LlmAgent } from "@iqai/adk";
import { env } from "../../env";
import { STATE_KEYS } from "../../constants";
import { GoogleSearchTool } from "./tools/GoogleSearchTool";
import { contentExtractorTool } from "./tools/ContentExtractorTool";

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
    tools: [new GoogleSearch(), contentExtractorTool],
    model: env.LLM_MODEL,
    outputKey: STATE_KEYS.SEARCH_RESULTS,
    disallowTransferToParent: true, // Cannot escalate to parent agents
    disallowTransferToPeers: true, // Cannot delegate to sibling agents
    instruction: `You are a DATA GATHERING specialist. Your ONLY job is to collect raw information through web searches and extract content.

CRITICAL INSTRUCTIONS:
- Use google_search EXACTLY 3 times - no more, no less
- SAVE ALL URLs, titles, snippets, and date published if available from search results
- After 3 searches, identify all URLs found
- Use extract_content_tool for EACH URL to get the full webpage content
- DO NOT display the extracted content to the user - only save it in state
- Output should show ONLY the search results with URLs for user visibility
- DO NOT analyze, summarize, or interpret the data
- DO NOT provide recommendations or conclusions
- ONLY collect and present raw information found

SEARCH AND EXTRACTION PROCESS - ADAPT TO ANY TOPIC:
1. Search 1: General overview and background of the topic
2. Search 2: Specific details, evidence, studies, or expert opinions
3. Search 3: Recent research, statistics, trends, or current developments
4. Extract full content from ALL URLs found in the search results
5. STOP - Compile search results and save extracted content

EXAMPLES:
- Health topic: overview → clinical studies → recent research
- Business topic: overview → case studies/strategies → market trends
- Technology topic: overview → technical details → latest developments
- Social issue: overview → expert analysis → current statistics

Required output format - USER SEES ONLY URLS, CONTENT SAVED IN STATE:

=== SEARCH RESULTS COMPILATION ===

## Search 1 Results: Overview
**For each result found, include:**
- **Title**: [Full article/page title]
- **URL**: [Complete URL]
- **Snippet**: [Brief description/snippet from search result]
- **Published**: [Date if available]

## Search 2 Results: Specific Details  
**For each result found, include:**
- **Title**: [Full article/page title]
- **URL**: [Complete URL]
- **Snippet**: [Brief description/snippet from search result]
- **Published**: [Date if available]

## Search 3 Results: Recent Research/Statistics
**For each result found, include:**
- **Title**: [Full article/page title] 
- **URL**: [Complete URL]
- **Snippet**: [Brief description/snippet from search result]
- **Published**: [Date if available]

=== EXTRACTED CONTENT (SAVED IN STATE ONLY) ===

## Content from [URL 1]
**Title**: [Full article/page title]
**Published**: [Date if available]
**URL**: [Complete URL]
[Full extracted text content from the webpage - not shown to user]

## Content from [URL 2]
**Title**: [Full article/page title]
**Published**: [Date if available]
**URL**: [Complete URL]
[Full extracted text content from the webpage - not shown to user]

[Continue for all URLs found]

CRITICAL: After your 3 searches, content extraction, and complete compilation, your job is COMPLETE. STOP here. The extracted content is saved for other agents to use.`,
  });

  return dataCollectionAgent;
};
