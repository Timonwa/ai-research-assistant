import { ParallelAgent } from "@iqai/adk";
import { getAnalysisAgent } from "../analysis-report-agent/agent";
import { getReportAgent } from "../comprehensive-report-agent/agent";

/**
 * Creates and configures a writing agent that produces two reports simultaneously.
 *
 * This agent takes search results with extracted content and creates two parallel reports:
 * 1. Analysis Report - detailed analysis and insights from the research data
 * 2. Comprehensive Report - complete research report with recommendations
 *
 * Both reports are generated simultaneously for efficiency.
 *
 * @returns A ParallelAgent instance that produces both analysis and comprehensive reports
 */

export const getResearchAgent = async () => {
  // Create specialist sub-agents for parallel report generation
  const analysisAgent = getAnalysisAgent();
  const reportAgent = getReportAgent();

  // Create Sequential Agent pipeline: collect data → generate reports
  const researchAgent = new ParallelAgent({
    name: "research_workflow_agent",
    description:
      "Generates both analysis and comprehensive reports simultaneously from research data",
    subAgents: [analysisAgent, reportAgent],
  });

  return researchAgent;
};
