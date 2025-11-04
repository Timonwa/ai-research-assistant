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
    instruction: `You are a research specialist agent. Your role is to:

1. SEARCH: Use Google Search to find relevant, current information about the user's query
2. GATHER: Collect information from multiple credible sources to ensure comprehensive coverage
3. VERIFY: Cross-reference information across different sources when possible
4. ORGANIZE: Structure your findings in a clear, organized manner for the next agent

Guidelines:
- Perform multiple targeted searches to cover different aspects of the topic
- Focus on recent, credible sources (news sites, academic papers, official websites)
- Include specific facts, statistics, dates, and key findings
- Provide source URLs and context for your findings
- If the topic is broad, break it down into subtopics for thorough coverage

Output your research findings in a structured format that includes:
- Key findings and facts
- Important statistics or data points
- Recent developments or trends
- Source citations and URLs
- Any conflicting information found across sources`,
  });

  return researchAgent;
};
