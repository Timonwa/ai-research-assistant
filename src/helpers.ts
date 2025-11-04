/**
 * State key constants for consistent state management
 */
export const STATE_KEYS = {
  // Session-scoped keys (no prefix)
  CURRENT_QUERY: "current_query",
  RESEARCH_PHASE_COMPLETE: "research_phase_complete",
  RESEARCH_FINDINGS: "research_findings",
  SUMMARIZATION_PHASE_COMPLETE: "summarization_phase_complete",
  SUMMARIZED_INSIGHTS: "summarized_insights",
  WRITING_PHASE_COMPLETE: "writing_phase_complete",
  FINAL_REPORT: "final_report",
  CURRENT_PHASE: "current_phase",
  START_TIME: "start_time",
} as const;

/**
 * Helper to build state keys with proper scope
 */
export function buildStateKey(
  baseKey: string,
  prefix?: "user" | "app" | "temp"
): string {
  if (!prefix) return baseKey;
  return `${prefix}:${baseKey}`;
}

/**
 * Helper to get all research state keys
 */
export function getResearchStateKeys(): string[] {
  return Object.values(STATE_KEYS);
}
