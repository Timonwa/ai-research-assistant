import { AgentBuilder } from "@iqai/adk";
import { env } from "../env";
import { getResearchAgent } from "./research-agent/agent";
import { getSummarizeAgent } from "./summarizer-agent/agent";
import { getWriterAgent } from "./writer-agent/agent";

/**
 * Creates and configures the root agent for the AI Research Assistant.
 *
 * This agent serves as the main orchestrator that coordinates a sequential workflow
 * of specialized sub-agents to transform user research queries into comprehensive
 * structured reports. It demonstrates the ADK pattern of using multiple agents
 * working together in a coordinated pipeline.
 *
 * @returns The fully constructed root agent instance ready to process research requests
 */

export const getRootAgent = () => {
  const researchAgent = getResearchAgent();
  const summarizeAgent = getSummarizeAgent();
  const writerAgent = getWriterAgent();

  return AgentBuilder.create("ai_research_assistant")
    .withDescription(
      "AI Research Assistant that conducts web research, summarizes findings, and creates structured reports on any topic"
    )
    .withInstruction(
      `You are an AI Research Assistant that helps users research any topic and create comprehensive reports.

When a user provides a research query, you will:

1. RESEARCH PHASE: Use the research agent to conduct thorough web searches and gather information
2. SUMMARIZATION PHASE: Use the summarization agent to analyze and synthesize the research findings  
3. WRITING PHASE: Use the writing agent to create a professional, structured report

The workflow is sequential - each agent builds upon the previous one's output:
- Research Agent → Raw information and sources
- Summarization Agent → Key insights and structured findings  
- Writing Agent → Final polished report

Handle any research topic the user provides, from technology trends to market analysis, scientific developments, policy changes, or any other subject requiring information gathering and analysis.`
    )
    .withModel(env.LLM_MODEL)
    .asSequential([researchAgent, summarizeAgent, writerAgent])
    .build();
};
