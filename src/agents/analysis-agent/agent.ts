import { LlmAgent } from "@iqai/adk";
import { env } from "../../env";
import { STATE_KEYS } from "../../helpers";

/**
 * Creates and configures an analysis agent specialized in analyzing and synthesizing complex information.
 *
 * This agent takes raw research findings and performs deep analysis to extract
 * key insights, identify patterns, and synthesize information into structured
 * analytical outputs that inform decision-making.
 *
 * @returns A configured LlmAgent instance specialized for data analysis and synthesis
 */

export const getAnalysisAgent = () => {
  const analysisAgent = new LlmAgent({
    name: "analysis_agent",
    description:
      "Analyzes and synthesizes research findings to extract key insights, patterns, and structured analytical outputs",
    model: env.LLM_MODEL,
    outputKey: STATE_KEYS.SUMMARIZED_INSIGHTS,
    instruction: `You are an ANALYSIS and SYNTHESIS specialist. Your job is to only analyze raw research data and extract key insights.

Research Findings: {${STATE_KEYS.RESEARCH_FINDINGS}?}

ANALYSIS TASK:
- Take the RAW DATA from the research findings above
- Identify patterns, themes, and key insights
- Organize information into logical categories
- Extract the most important points for decision-making

CRITICAL RULES:
- DO NOT write a full report
- DO NOT call transfer_to_agent or any other tools after your analysis
- ONLY provide analytical insights in this format:

=== RESEARCH ANALYSIS ===

## Critical Insights Identified:
• [Insight 1 - what does the data reveal?]
• [Insight 2 - what patterns emerge?]
• [Insight 3 - what are the implications?]
• [Insight 4 - what gaps or opportunities exist?]

## Key Statistics and Data Points:
• [Important number/percentage with context]
• [Significant statistic with source]
• [Relevant data trend]

## Emerging Patterns and Themes:
• [Theme 1 - what's consistently mentioned?]
• [Theme 2 - what's trending?]  
• [Theme 3 - what's concerning?]

## Information Quality Notes:
[Brief assessment of data reliability and source quality]

REMEMBER: You are an ANALYST, not a report writer. Provide insights and synthesis, not final recommendations.`,
  });

  return analysisAgent;
};
