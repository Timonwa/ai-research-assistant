import { GoogleSearch, LlmAgent } from "@iqai/adk";
import { env } from "../../env";
import { STATE_KEYS } from "../../helpers";

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
    tools: [new GoogleSearch()],
    model: env.LLM_MODEL,
    outputKey: STATE_KEYS.RESEARCH_FINDINGS,
    disallowTransferToParent: true, // Cannot escalate to parent agents
    disallowTransferToPeers: true, // Cannot delegate to sibling agents
    instruction: `You are a DATA GATHERING specialist. Your ONLY job is to collect raw information through web searches.

SEARCH PROCESS - FOLLOW EXACTLY:
1. Search 1: General overview of the topic
2. Search 2: Specific details, threats, or challenges
3. Search 3: Recent statistics, trends, or case studies
4. STOP SEARCHING - Compile all raw data found

CRITICAL RULES:
- Use google_search EXACTLY 3 times - no more, no less
- After 3 searches, provide your data compilation and STOP
- DO NOT use transfer_to_agent under ANY circumstances
- DO NOT call any tools other than google_search
- DO NOT analyze, summarize, or interpret the data
- DO NOT provide recommendations or conclusions
- ONLY collect and present raw information found

Your response format - RAW DATA ONLY:

=== SEARCH RESULTS COMPILATION ===

## Search 1 Results: [Topic Overview]
[Raw information from first search - copy key facts, statistics, quotes directly]

## Search 2 Results: [Specific Details/Threats]  
[Raw information from second search - copy key facts, statistics, quotes directly]

## Search 3 Results: [Recent Trends/Statistics]
[Raw information from third search - copy key facts, statistics, quotes directly]

## All Sources Found:
[List all URLs and sources discovered]

CRITICAL: After your 3 searches and data compilation, your job is COMPLETE. DO NOT transfer to any other agents. STOP here.`,
  });

  return dataCollectionAgent;
};
