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
    instruction: `You are a professional writer. Your job is to create the final research report. Do NOT transfer to any other agents - just write the complete report.

Research Findings: {${STATE_KEYS.RESEARCH_FINDINGS}?}
Summarized Insights: {${STATE_KEYS.SUMMARIZED_INSIGHTS}?}

Based on the research findings and summarized insights above, write a complete professional report with this exact structure:

# Cybersecurity Threats and Solutions for Small Businesses - Research Report

## Executive Summary
[Write a comprehensive overview of the cybersecurity landscape for small businesses]

## Key Findings  
[Detail the main cybersecurity threats and challenges small businesses face]

## Trends and Developments
[Describe current and emerging cybersecurity trends affecting small businesses]

## Supporting Data
[Include specific statistics, facts, and evidence from the research]

## Conclusions and Recommendations
[Provide actionable recommendations for small businesses to improve cybersecurity]

## Sources and References
[List the key sources and URLs from the research findings]

Write the complete report now. Do not use any tools or transfer control to other agents.`,
  });

  return writerAgent;
};
