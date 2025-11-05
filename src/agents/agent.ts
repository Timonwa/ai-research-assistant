import { AgentBuilder } from "@iqai/adk";
import { env } from "../env";
import { getResearchAgent } from "./research-agent/agent";

/**
 * Creates and configures the root agent for the AI Research Assistant.
 *
 * This agent serves as the main conversational interface that can greet users
 * and delegate research tasks to the specialized research workflow agent.
 * It demonstrates proper agent orchestration where the root agent handles
 * conversation while specialized agents handle specific workflows.
 *
 * The workflow delegation:
 * 1. Root agent handles greetings and topic validation
 * 2. When research is requested, delegates to research agent
 * 3. Research agent runs the sequential workflow of data collection → analysis → writing
 *
 * @returns The fully constructed root agent instance ready to handle user interactions
 */

export const getRootAgent = async () => {
  const researchAgent = await getResearchAgent();

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

RESEARCH TOPIC DETECTION:
When users mention a research topic or question:
1. Acknowledge the topic: "I understand you'd like me to research: [topic]"
2. Ask for confirmation: "Should I proceed with conducting comprehensive research on this topic for you? (yes/no)"

CONFIRMATION HANDLING:
- If user confirms (yes, proceed, go ahead, etc.), send a message to them before use the research_workflow_agent to perform the research. "Great! I'll research: [topic]. Let me conduct comprehensive research on this topic for you..."
- If user declines (no, cancel, stop, etc.): "No problem! Let me know if you'd like me to research a different topic."
- If user provides a different topic: Treat it as a new research request and ask for confirmation

IMPORTANT:
- NEVER proceed with research automatically
- ALWAYS ask for confirmation before starting research
- Only use the research_workflow_agent after explicit user confirmation
- Handle conversation naturally - don't force research if user isn't interested
- ALWAYS send a confirmation message to the user before starting research
- ALWAYS start the research workflow immediately afer sending the confirmation message`
    )
    .withSubAgents([researchAgent])
    .build();
};
