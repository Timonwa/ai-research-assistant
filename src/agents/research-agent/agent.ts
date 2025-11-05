import { GoogleSearch, LlmAgent } from "@iqai/adk";
import { env } from "../../env";
import { STATE_KEYS } from "../../helpers";

/**
 * Creates and configures a research agent specialized in web research and data gathering.
 *
 * This agent is equipped with Google Search capabilities to find relevant information
 * on any given topic. It conducts comprehensive web searches, analyzes multiple sources,
 * and gathers factual information to support research queries.
 *
 * @returns A configured LlmAgent instance specialized for web research and information gathering
 */

export const getResearchAgent = () => {
  const researchAgent = new LlmAgent({
    name: "research_agent",
    description:
      "Conducts comprehensive web research and gathers information from multiple online sources on any given topic",
    tools: [new GoogleSearch()],
    model: env.LLM_MODEL,
    outputKey: STATE_KEYS.RESEARCH_FINDINGS,
    instruction: `You are a DATA GATHERING specialist. Your ONLY job is to collect raw information through web searches.

SEARCH PROCESS - FOLLOW EXACTLY:
1. Search 1: General overview of the topic
2. Search 2: Specific details, threats, or challenges
3. Search 3: Recent statistics, trends, or case studies
4. STOP SEARCHING - Compile all raw data found

CRITICAL RULES:
- Use google_search EXACTLY 3 times - no more, no less
- DO NOT analyze, summarize, or interpret the data
- DO NOT provide recommendations or conclusions
- ONLY collect and present raw information found
- DO NOT call transfer_to_agent or any other tools after your 3 searches

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

REMEMBER: You are a DATA COLLECTOR only. Do not search more than 3 times. Present facts and information exactly as found. Let other agents do the analysis.`,
  });

  return researchAgent;
};
