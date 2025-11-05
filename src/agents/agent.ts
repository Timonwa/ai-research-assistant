import { AgentBuilder } from "@iqai/adk";
import { env } from "../env";
import { getDataCollectionAgent } from "./data-collection-agent/agent";
import { getAnalysisAgent } from "./analysis-agent/agent";
import { getWriterAgent } from "./writer-agent/agent";

/**
 * Creates and configures the root agent for the AI Research Assistant.
 *
 * This agent serves as the main orchestrator that coordinates a sequential workflow
 * of specialized sub-agents to transform user research queries into comprehensive
 * structured reports. It demonstrates the ADK pattern of using multiple agents
 * working together in a coordinated pipeline with session state management.
 *
 * The workflow uses session state to pass data between agents:
 * 1. Data Collection Agent saves raw findings to session state
 * 2. Analysis Agent reads findings and saves analytical insights
 * 3. Writer Agent reads insights and produces final report
 *
 * @returns The fully constructed root agent instance ready to process research requests
 */

export const getRootAgent = () => {
  const dataCollectionAgent = getDataCollectionAgent();
  const analysisAgent = getAnalysisAgent();
  const writerAgent = getWriterAgent();

  return AgentBuilder.create("ai_research_assistant")
    .withDescription(
      "AI Research Assistant that systematically collects data, analyzes insights, and creates comprehensive reports on any topic"
    )
    .withModel(env.LLM_MODEL)
    .asSequential([dataCollectionAgent, analysisAgent, writerAgent])
    .build();
};
