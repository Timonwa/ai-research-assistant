import { SequentialAgent } from "@iqai/adk";
import { getDataCollectionAgent } from "../data-collection-agent/agent";
import { getAnalysisAgent } from "../analysis-agent/agent";
import { getWriterAgent } from "../writer-agent/agent";

/**
 * Creates and configures the research workflow agent for the AI Research Assistant.
 *
 * This agent demonstrates the Sequential Agent pattern, coordinating a pipeline
 * of specialized sub-agents that execute in order to transform user research queries
 * into comprehensive structured reports. Each agent builds on the previous one's output.
 *
 * Sequential Pipeline Flow:
 * 1. Data Collection Agent → gathers raw research data from web sources
 * 2. Analysis Agent → analyzes collected data and extracts key insights
 * 3. Writer Agent → creates comprehensive report from research and insights
 *
 * This showcases how Sequential Agents enable sophisticated multi-step reasoning
 * where each specialist agent contributes to progressively enriched output.
 *
 * @returns The fully constructed sequential research workflow agent
 */

export const getResearchAgent = async () => {
  // Create specialist sub-agents for the sequential pipeline
  const dataCollectionAgent = getDataCollectionAgent();
  const analysisAgent = getAnalysisAgent();
  const writerAgent = getWriterAgent();

  // Create Sequential Agent pipeline: research → analyze → write
  const researchAgent = new SequentialAgent({
    name: "research_workflow_agent",
    description:
      "Orchestrates a sequential workflow of data collection, analysis, and report writing to produce comprehensive research reports",
    subAgents: [dataCollectionAgent, analysisAgent, writerAgent],
  });

  return researchAgent;
};
