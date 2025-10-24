import { LlmAgent } from "@iqai/adk";

/**
 * Creates and configures a joke agent specialized in providing humor.
 *
 * This agent is equipped with tools to fetch and deliver jokes to users.
 * It uses the Gemini 2.5 Flash model for natural conversation flow and
 * can access joke-related tools for entertainment purposes.
 *
 * @returns A configured LlmAgent instance specialized for summarizer assistance
 */

export const getSummarizeAgent = () => {
  const summarizeAgent = new LlmAgent({
    name: "summarize_agent",
    description: "provides summarizer assistance",
  });

  return summarizeAgent;
};
