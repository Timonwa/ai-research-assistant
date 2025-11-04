import { AgentBuilder } from "@iqai/adk";
import { env } from "../env";
import { getResearchAgent } from "./research-agent/agent";
import { getSummarizeAgent } from "./summarizer-agent/agent";
import { getWriterAgent } from "./writer-agent/agent";
import { STATE_KEYS } from "../helpers";

/**
 * Creates and configures the root agent for the AI Research Assistant.
 *
 * This agent serves as the main orchestrator that coordinates a sequential workflow
 * of specialized sub-agents to transform user research queries into comprehensive
 * structured reports. It demonstrates the ADK pattern of using multiple agents
 * working together in a coordinated pipeline with session state management.
 *
 * The workflow uses session state to pass data between agents:
 * 1. Research Agent saves findings to session state
 * 2. Summarizer Agent reads findings and saves insights
 * 3. Writer Agent reads insights and produces final report
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

When a user provides a research query, you will execute a sequential workflow:

1. RESEARCH PHASE: The research agent will conduct thorough web searches using Google Search and gather comprehensive information. It will save all findings to the session state.

2. SUMMARIZATION PHASE: The summarizer agent will read the research findings from session state, analyze them, and extract key insights. It will save the summarized insights back to session state.

3. WRITING PHASE: The writer agent will read both the research findings and summarized insights from session state, then create a professional, structured report.

The workflow is sequential - each agent builds upon the previous one's output using session state:
- Research Agent → saves to session state: ${STATE_KEYS.RESEARCH_FINDINGS}
- Summarization Agent → reads research findings, saves to session state: ${STATE_KEYS.SUMMARIZED_INSIGHTS}
- Writing Agent → reads research and summary, saves to session state: ${STATE_KEYS.FINAL_REPORT}

Handle any research topic the user provides, from technology trends to market analysis, scientific developments, policy changes, or any other subject requiring information gathering and analysis.

Important: Each agent will automatically save its output to session state, allowing the next agent to build upon the previous work. This creates a seamless, context-aware workflow.`
    )
    .withModel(env.LLM_MODEL)
    .asSequential([researchAgent, summarizeAgent, writerAgent])
    .build();
};
