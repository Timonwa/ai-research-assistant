import { LlmAgent } from "@iqai/adk";
import { env } from "../../env";
import { STATE_KEYS } from "../../helpers";

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
    outputKey: STATE_KEYS.SUMMARIZED_INSIGHTS,
    instruction: `You are a summarization specialist. Your job is to analyze the research findings and provide a structured summary. Do NOT transfer to any other agents - just provide your complete analysis.

Research Findings: {${STATE_KEYS.RESEARCH_FINDINGS}?}

Based on the research findings above, create this exact structured summary:

### Executive Summary
[Write 2-3 sentences summarizing the main cybersecurity findings for small businesses]

### Key Insights
[List 4-5 main insights about threats and solutions from the research]

### Important Statistics and Facts  
[Include specific numbers, percentages, and data from the research]

### Notable Trends
[Describe current cybersecurity trends for small businesses]

### Source Quality Assessment
[Brief assessment of the research source reliability]

Write your complete structured summary now. Do not use any tools or transfer control to other agents.`,
  });

  return summarizeAgent;
};
