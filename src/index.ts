import * as dotenv from "dotenv";
import { getRootAgent } from "./agents/agent";
import { STATE_KEYS } from "./helpers";

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
  // Example research queries for demonstration
  const researchQuery =
    "Cybersecurity threats and solutions for small businesses";

  const { runner, session, sessionService } = await getRootAgent();

  console.log("🔬 AI Research Assistant Demo");
  console.log("==============================\n");

  console.log(`📋 Research Query: ${researchQuery}`);
  console.log("🔍 Starting research workflow...\n");

  try {
    // Execute the research workflow
    // The sequential agent workflow automatically manages state passing:
    // 1. Data Collection Agent saves findings to session state via outputKey
    // 2. Analysis Agent reads findings from state, saves insights to state
    // 3. Writer Agent reads both from state and produces final report
    const response = await runner.ask(researchQuery);

    // Get the updated session after the workflow completes
    // The original session object doesn't automatically update, so we need to retrieve the current state
    const updatedSession = await sessionService.getSession(
      session.appName,
      session.userId,
      session.id
    );

    console.log("\n" + "=".repeat(80));
    console.log("🔍 RESEARCH FINDINGS:");
    console.log("=".repeat(80));
    console.log(
      updatedSession?.state[STATE_KEYS.RESEARCH_FINDINGS] ||
        "No research findings found"
    );

    console.log("\n" + "=".repeat(80));
    console.log("� ANALYTICAL INSIGHTS:");
    console.log("=".repeat(80));
    console.log(
      updatedSession?.state[STATE_KEYS.SUMMARIZED_INSIGHTS] ||
        "No analytical insights found"
    );

    console.log("\n" + "=".repeat(80));
    console.log("📊 FINAL RESEARCH REPORT:");
    console.log("=".repeat(80));
    // Handle different response types properly
    if (typeof response === "string") {
      console.log(response);
    } else if (Array.isArray(response)) {
      // If it's an array of strings, join them
      if (response.every(item => typeof item === "string")) {
        console.log(response.join("\n"));
      } else {
        // If it's an array of objects, get the content from each
        const contents = response.map(item => {
          if (typeof item === "string") return item;
          if (item && typeof item === "object") {
            // Check for common response properties
            if ("response" in item) return (item as any).response;
            if ("content" in item) return (item as any).content;
            if ("output" in item) return (item as any).output;
          }
          return JSON.stringify(item, null, 2);
        });
        console.log(contents.join("\n"));
      }
    } else if (typeof response === "object") {
      console.log(JSON.stringify(response, null, 2));
    } else {
      console.log(response);
    }

    console.log("\n" + "=".repeat(80));
    console.log("🔧 DEBUG - Session State Keys Available:");
    console.log(Object.keys(updatedSession?.state || {}));
    console.log("🔧 DEBUG - Response Type:", typeof response);
    console.log(
      "🔧 DEBUG - Response Structure:",
      Array.isArray(response) ? "Array" : "Not Array"
    );
    console.log("\n" + "=".repeat(80) + "\n");
  } catch (error) {
    console.error(`❌ Error processing query "${researchQuery}":`, error);
    console.log("\n" + "=".repeat(80) + "\n");
  }
}

main().catch(console.error);
