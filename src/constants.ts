/**
 * State key constants for consistent state management across agents
 */
export const STATE_KEYS = {
  RESEARCH_FINDINGS: "research_findings", // Data Collection Agent output
  SUMMARIZED_INSIGHTS: "summarized_insights", // Analysis Agent output
  FINAL_REPORT: "final_report", // Writer Agent output
} as const;
