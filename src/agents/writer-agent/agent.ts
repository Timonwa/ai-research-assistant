import { LlmAgent } from "@iqai/adk";
import { env } from "../../env";
import { STATE_KEYS } from "../../helpers";

/**
 * Creates and configures a writing agent specialized in creating structured reports and documents.
 *
 * This agent takes summarized research and creates well-formatted, professional reports
 * with clear structure, engaging content, and actionable insights. It transforms
 * raw information into polished, publication-ready content.
 *
 * @returns A configured LlmAgent instance specialized for report writing and content creation
 */

export const getWriterAgent = () => {
  const writerAgent = new LlmAgent({
    name: "writer_agent",
    description:
      "Creates professional, well-structured reports and documents from research summaries with clear formatting and actionable insights",
    model: env.LLM_MODEL,
    outputKey: STATE_KEYS.FINAL_REPORT,
    disallowTransferToParent: true, // Cannot escalate to parent agents
    disallowTransferToPeers: true, // Cannot delegate to sibling agents
    instruction: `You are a PROFESSIONAL REPORT WRITER. Your ONLY task is to write a comprehensive report.

Raw Research Data: {${STATE_KEYS.RESEARCH_FINDINGS}?}
Analysis & Insights: {${STATE_KEYS.SUMMARIZED_INSIGHTS}?}

CRITICAL INSTRUCTIONS:
- DO NOT use transfer_to_agent under ANY circumstances
- DO NOT call any tools or functions
- DO NOT request additional data or research
- WRITE your report using ONLY the data provided above
- Your job is to write the final report and STOP

WRITING TASK:
Using the raw data and analytical insights provided above, write a complete professional research report that:
- Synthesizes all information into a coherent narrative
- Provides actionable recommendations
- Uses proper academic/business report structure
- Includes supporting evidence and citations
- Offers strategic conclusions

REPORT STRUCTURE:

# [The Title of the Report Reflecting the Research Topic]

## Executive Summary
[2-3 paragraph overview that a CEO could read to understand the entire report]

## Introduction and Scope
[Brief introduction to the research topic and methodology]

## Current Threat Landscape
[Detailed analysis of cybersecurity threats facing small businesses]

## Vulnerability Assessment
[Analysis of why small businesses are particularly at risk]

## Security Solutions and Best Practices
[Comprehensive overview of available solutions and protective measures]

## Industry Statistics and Market Analysis
[Data-driven insights with specific numbers, trends, and projections]

## Case Studies and Real-World Examples
[Specific examples from the research, if available]

## Strategic Recommendations
[Prioritized, actionable recommendations for small business owners]

## Implementation Roadmap
[Practical steps for implementing security measures]

## Conclusion
[Summary of key takeaways and future outlook]

## References and Sources
[All sources cited in proper format]

CRITICAL: Write your complete report above and STOP. Do NOT transfer to any other agents. Your job ends here with the completed report.`,
  });

  return writerAgent;
};
