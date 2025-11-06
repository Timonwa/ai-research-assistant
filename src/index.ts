import * as dotenv from "dotenv";
import { getRootAgent } from "./agents/agent";

dotenv.config();

/**
 * This demo shows how three specialized agents work in sequence to process a topic,
 * each producing their own distinct output:
 * 1. Data Collection Agent - Produces raw research findings from web searches
 * 2. Analysis Agent - Produces analytical insights from the findings
 * 3. Writer Agent - Produces a final structured report
 *
 * Each agent saves its output to session state via the outputKey property.
 * The outputs are then used by the next agent in the sequence,
 * demonstrating sequential processing, where each agent builds on the previous one's output.
 */

async function main() {
  const { runner } = await getRootAgent();

  console.log("==============================\n");
  console.log("🔬 AI Research Assistant");
  console.log("==============================\n");

  // Run the research query through the agent workflow
  try {
    // Initial greeting
    const userInput1 = "Hi there!";
    console.log(`👤 User: ${userInput1}`);
    const greeting = await runner.ask(userInput1);
    console.log(`🤖 Agent: ${greeting}\n`);

    // User provides research topic
    const userInput2 = "Can you help me research about cybersecurity for small businesses?";
    console.log(`👤 User: ${userInput2}`);
    const topicResponse = await runner.ask(userInput2);
    console.log(`🤖 Agent: ${topicResponse}\n`);

    // User confirms to proceed
    const userInput3 = "Yes, please proceed!";
    console.log(`👤 User: ${userInput3}`);
    const result = await runner.ask(userInput3);
    console.log(`🤖 Agent: ${result}\n`);
  } catch (error) {
    console.error(`❌ Error processing research request:`, error);
    console.log("\n" + "=".repeat(80) + "\n");
  }
}

main().catch(console.error);
