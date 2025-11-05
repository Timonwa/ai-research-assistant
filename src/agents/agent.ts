import { AgentBuilder } from "@iqai/adk";
import { env } from "../env";
import { getResearchAgent } from "./research-agent/agent";
import { getAnalysisAgent } from "./analysis-agent/agent";
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
  const analysisAgent = getAnalysisAgent();
  const writerAgent = getWriterAgent();

  return AgentBuilder.create("ai_research_assistant")
    .withDescription(
      "AI Research Assistant that conducts web research, analyzes findings, and creates structured reports on any topic"
    )
    .withModel(env.LLM_MODEL)
    .asSequential([researchAgent, analysisAgent, writerAgent])
    .build();
};
