import { LlmAgent } from "@iqai/adk";
import { env } from "../../env";
import { STATE_KEYS } from "../../constants";

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
    disallowTransferToParent: true, // Cannot escalate to parent agents
    disallowTransferToPeers: true, // Cannot delegate to sibling agents
    instruction: `You are an ANALYSIS and SYNTHESIS specialist. Your ONLY job is to analyze the research data below and provide insights.

Research Findings: {${STATE_KEYS.RESEARCH_FINDINGS}?}

CRITICAL INSTRUCTIONS:
- DO NOT ask for more data or suggest additional research
- COMPLETE your analysis with the data provided above
- Analyze ONLY the research findings provided in the session state

ANALYSIS PROCESS - FOLLOW EXACTLY:
1. Read the research findings above
2. Extract key insights and patterns
3. Provide your complete analysis in the exact format below
4. Your job is to complete the analysis and STOP

Required output format:

=== RESEARCH ANALYSIS ===

# [The Title of Your Analysis Reflecting the Research Topic
]

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

CRITICAL: Complete your analysis above and STOP. Do NOT transfer to any other agents. Your job ends here.`,
  });

  return analysisAgent;
};
