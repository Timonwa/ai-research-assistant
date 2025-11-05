import * as dotenv from "dotenv";
import { getRootAgent } from "./agents/agent";
import { STATE_KEYS } from "./constants";

dotenv.config();

/**
 * Main function demonstrating the AI Research Assistant.
 *
 * Creates a research assistant that uses a sequential workflow of specialized agents:
 * 1. Data Collection Agent - Conducts web searches using Google Search and saves findings to session state
 * 2. Analysis Agent - Reads findings from state, analyzes and synthesizes them, saves insights to session state
 * 3. Writer Agent - Reads research and insights from state, creates structured reports and saves final report to session state
 *
 * Each agent saves its output to session state via the outputKey property, allowing the next agent to read and build upon it.
 */
async function main() {
  // Example research query for demonstration
  const researchQuery =
    "Cybersecurity threats and solutions for small businesses";

  const { runner, session, sessionService } = await getRootAgent();

  console.log("==============================\n");
  console.log("🔬 AI Research Assistant Demo");
  console.log("==============================\n");

  console.log(`📋 Research Query: ${researchQuery}`);
  console.log("🔍 Starting research workflow...\n");

  // Run the research query through the agent workflow
  await runner.ask(researchQuery);
  try {
    // Execute the research workflow
    // The sequential agent workflow automatically manages state passing:
    // 1. Data Collection Agent saves findings to session state via outputKey
    // 2. Analysis Agent reads findings from state, analyzes them, and saves insights to state
    // 3. Writer Agent gets both states from state and produces final report

    //TODO Get the updated session after the workflow completes
    // The original session object doesn't automatically update, so we need to retrieve the current state
    const updatedSession = await sessionService.getSession(
      session.appName,
      session.userId,
      session.id
    );

    // Display results from each agent for debugging
    console.log("\n✅ Research workflow completed successfully!");

    console.log("\n" + "=".repeat(80));
    console.log("🔬 DATA COLLECTION RESULTS:");
    console.log("=".repeat(80));
    console.log(
      updatedSession?.state[STATE_KEYS.RESEARCH_FINDINGS] ||
        "No research findings found"
    );

    console.log("\n" + "=".repeat(80));
    console.log("🔍 ANALYTICAL INSIGHTS:");
    console.log("=".repeat(80));
    console.log(
      updatedSession?.state[STATE_KEYS.SUMMARIZED_INSIGHTS] ||
        "No analytical insights found"
    );

    console.log("\n" + "=".repeat(80));
    console.log("📊 FINAL RESEARCH REPORT:");
    console.log("=".repeat(80));
    console.log(
      updatedSession?.state[STATE_KEYS.FINAL_REPORT] ||
        "No final report generated"
    );
    console.log("=".repeat(80) + "\n");
  } catch (error) {
    console.error(`❌ Error processing query "${researchQuery}":`, error);
    console.log("\n" + "=".repeat(80) + "\n");
  }
}

main().catch(console.error);
