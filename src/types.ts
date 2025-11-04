/**
 * State Manager for AI Research Assistant
 *
 * Manages session state for passing data between research agents:
 * - Research findings from Research Agent
 * - Summarized insights from Summarizer Agent
 * - Final report from Writer Agent
 */

export interface ResearchFindingsProps {
  query: string;
  searches: Array<{
    query: string;
    results: string;
  }>;
  rawFindings: string;
  timestamp: string;
}

export interface SummarizedInsightsProps {
  executiveSummary: string;
  keyInsights: string[];
  statistics: string[];
  trends: string[];
  sourceAssessment: string;
  timestamp: string;
}

export interface ResearchStateProps {
  // Session-scoped research data
  currentQuery?: string;
  researchPhaseComplete?: boolean;
  ResearchFindingsProps?: ResearchFindingsProps;
  summarizationPhaseComplete?: boolean;
  SummarizedInsightsProps?: SummarizedInsightsProps;
  writingPhaseComplete?: boolean;
  finalReport?: string;

  // Metadata
  startTime?: string;
  currentPhase?: "research" | "summarization" | "writing" | "complete";
}
