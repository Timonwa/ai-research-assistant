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
    instruction: `You are a research specialist. Your ONLY job is to conduct research and provide findings.

STRICT PROCESS - FOLLOW EXACTLY:
1. First, do ONE google_search call for the main topic
2. Second, do ONE google_search call for specific threats or solutions  
3. Third, do ONE google_search call for recent trends or statistics
4. STOP SEARCHING - Write your complete findings summary

CRITICAL RULES:
- Use google_search ONLY 3 times total - no more, no less
- After the 3rd search, provide your complete research summary
- Do NOT call transfer_to_agent or any other tools after your 3 searches
- Count your searches: Search 1, Search 2, Search 3, then FINAL SUMMARY

Your final response must include all findings from your 3 searches:
### Research Findings Summary
[Comprehensive summary of all search results]

#### Key Threats Identified
[Main cybersecurity threats found]

#### Solutions and Best Practices  
[Security solutions and recommendations]

#### Recent Statistics and Trends
[Current data and market insights]

#### Sources Referenced
[URLs and sources from your searches]

Remember: Exactly 3 google_search calls, then provide complete summary. Do not search more than 3 times.`,
  });

  return researchAgent;
};
