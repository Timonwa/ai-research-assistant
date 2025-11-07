/**
 * State key constants for consistent state management across agents
 */
export const STATE_KEYS = {
  SEARCH_RESULTS: "search_results", // Data Collection Agent output
  SUMMARIZED_INSIGHTS: "summarized_insights", // Analysis Agent output
  FINAL_REPORT: "final_report", // Writer Agent output
} as const;
