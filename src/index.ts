import * as dotenv from "dotenv";
import { getRootAgent } from "./agents/agent";

dotenv.config();

/**
 * Main function demonstrating the AI Research Assistant.
 *
 * Creates a research assistant that uses a sequential workflow of specialized agents:
 * 1. Research Agent - Conducts web searches using Google Search and saves findings to session state
 * 2. Summarizer Agent - Reads findings from state, analyzes and synthesizes them, saves insights to session state
 * 3. Writer Agent - Reads research and insights from state, creates structured reports and saves final report to session state
 *
 * Each agent saves its output to session state via the outputKey property, allowing the next agent to read and build upon it.
 */
async function main() {
  // Example research queries for demonstration
  const researchQuery =
    "Cybersecurity threats and solutions for small businesses";

  const { runner } = await getRootAgent();

  console.log("🔬 AI Research Assistant Demo");
  console.log("==============================\n");

  console.log(`📋 Research Query: ${researchQuery}`);
  console.log("🔍 Starting research workflow...\n");

  try {
    // Execute the research workflow
    // The sequential agent workflow automatically manages state passing:
    // 1. Research Agent saves findings to session state via outputKey
    // 2. Summarizer Agent reads findings from state, saves insights to state
    // 3. Writer Agent reads both from state and produces final report
    const response = await runner.ask(researchQuery);

    console.log(`📊 Research Report:\n${response}`);
    console.log("\n" + "=".repeat(80) + "\n");
  } catch (error) {
    console.error(`❌ Error processing query "${researchQuery}":`, error);
    console.log("\n" + "=".repeat(80) + "\n");
  }
}

main().catch(console.error);
