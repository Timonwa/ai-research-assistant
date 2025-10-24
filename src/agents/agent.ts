import { AgentBuilder } from "@iqai/adk";
import { env } from "../env";
import { getResearchAgent } from "./research-agent/agent";
import { getSummarizeAgent } from "./summarizer-agent/agent";
import { getWriterAgent } from "./writer-agent/agent";

/**
 * Creates and configures the root agent for the simple agent demonstration.
 *
 * This agent serves as the main orchestrator that routes user requests to
 * specialized sub-agents based on the request type. It demonstrates the
 * basic ADK pattern of using a root agent to coordinate multiple specialized
 * agents for different domains (jokes and weather).
 *
 * @returns The fully constructed root agent instance ready to process requests
 */

export const getRootAgent = () => {
  const researchAgent = getResearchAgent();
  const summarizeAgent = getSummarizeAgent();
  const writerAgent = getWriterAgent();

  return AgentBuilder.create("root_agent")
    .withDescription(
      "Root agent that runs sub-agents in sequence based on user requests."
    )
    .withInstruction(
      "Use the research sub-agent for research requests, the summarization sub-agent for summarization requests, and the writing sub-agent for writing assistance."
    )
    .withModel(env.LLM_MODEL)
    .asSequential([researchAgent, summarizeAgent, writerAgent])
    .build();
};
