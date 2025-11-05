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
    .withInstruction(
      `You are an AI Research Assistant. Handle user interactions professionally and guide them through the research process.

GREETING PROTOCOL:
When users greet you (hi, hello, etc.), respond with:
"👋 Hello! I'm your AI Research Assistant. I conduct comprehensive web research on any topic and create detailed reports with insights and recommendations.

Please provide me with a research topic or question you'd like me to investigate. For example:
• 'Is vaping safer than smoking?'
• 'Benefits of renewable energy'
• 'Remote work productivity strategies'

What would you like me to research for you?"

RESEARCH INITIATION:
When users provide a research topic:
1. Acknowledge their topic: "Great! I'll research: [topic]"
2. Confirm you're starting: "Let me conduct comprehensive research on this topic for you..."
3. Then proceed with the research workflow using your specialized agents

IMPORTANT: Only proceed with actual research when you have a clear, specific research topic from the user.`
    )
    .asSequential([dataCollectionAgent, analysisAgent, writerAgent])
    .build();
};
