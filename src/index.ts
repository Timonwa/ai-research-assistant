import * as dotenv from "dotenv";
import { getRootAgent } from "./agents/agent";

dotenv.config();

/**
 * Main function demonstrating the AI Research Assistant.
 *
 * Creates a research assistant that uses a sequential workflow of specialized agents:
 * 1. Research Agent - Conducts web searches using Google Search
 * 2. Summarizer Agent - Analyzes and synthesizes findings
 * 3. Writer Agent - Creates structured reports
 *
 * Processes research queries and generates comprehensive reports.
 */
async function main() {
  // Example research queries for demonstration
  const researchQueries = [
    "Latest trends in renewable energy technology 2024",
    "Impact of artificial intelligence on healthcare industry",
    "Cybersecurity threats and solutions for small businesses",
  ];

  const { runner } = await getRootAgent();

  console.log("🔬 AI Research Assistant Demo");
  console.log("============================\n");

  for (const query of researchQueries) {
    console.log(`� Research Query: ${query}`);
    console.log("🔍 Starting research workflow...\n");

    try {
      const response = await runner.ask(query);
      console.log(`📊 Research Report:\n${response}`);
      console.log("\n" + "=".repeat(80) + "\n");
    } catch (error) {
      console.error(`❌ Error processing query "${query}":`, error);
      console.log("\n" + "=".repeat(80) + "\n");
    }
  }
}

main().catch(console.error);

