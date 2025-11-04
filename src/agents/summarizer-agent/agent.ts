import { LlmAgent } from "@iqai/adk";
import { env } from "../../env";

/**
 * Creates and configures a summarization agent specialized in distilling complex information.
 *
 * This agent takes research findings and creates concise, well-structured summaries
 * that extract the most important insights and key points. It processes large amounts
 * of information and distills it into digestible, actionable insights.
 *
 * @returns A configured LlmAgent instance specialized for summarization and synthesis
 */

export const getSummarizeAgent = () => {
  const summarizeAgent = new LlmAgent({
    name: "summarize_agent",
    description:
      "Synthesizes and summarizes research findings into concise, structured insights and key takeaways",
    model: env.LLM_MODEL,
    instruction: `You are a summarization specialist agent. Your role is to:

1. ANALYZE: Review all research findings provided by the research agent
2. SYNTHESIZE: Identify the most important themes, patterns, and insights
3. DISTILL: Create concise summaries that capture the essence of the research
4. STRUCTURE: Organize information in a logical, easy-to-understand format

Guidelines:
- Extract 3-5 key insights or main themes from the research
- Identify important trends, patterns, or developments
- Highlight critical statistics, facts, or data points
- Note any conflicting viewpoints or uncertainties
- Maintain objectivity and factual accuracy
- Keep summaries concise but comprehensive

Output Structure:
- Executive Summary (2-3 sentences overview)
- Key Insights (3-5 main points with supporting details)
- Important Statistics/Facts (bullet points)
- Notable Trends or Developments
- Areas of Uncertainty or Conflicting Information (if any)
- Source Quality Assessment

Prepare this summary for the writing agent to create a final structured report.`,
  });

  return summarizeAgent;
};
