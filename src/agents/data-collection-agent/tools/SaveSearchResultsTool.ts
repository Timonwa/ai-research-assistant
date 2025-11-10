import { createTool } from "@iqai/adk";
import { z } from "zod";
import { STATE_KEYS } from "../../../constants";

/**
 * Tool for saving search results to state while returning clean user output
 *
 * This tool separates what gets saved to state (full data with extracted content)
 * from what gets shown to the user (clean URL list without content)
 */
export const saveSearchResultsTool = createTool({
  name: "save_search_results",
  description:
    "Save complete search results to state and return clean user display",
  schema: z.object({
    search_results: z
      .array(
        z.object({
          round: z
            .string()
            .describe("Search round identifier (e.g., '1 - Overview')"),
          results: z.array(
            z.object({
              title: z.string().describe("Article or page title"),
              url: z.string().describe("Complete URL of the source"),
              snippet: z
                .string()
                .describe("Search result snippet or description"),
              published: z
                .string()
                .describe("Publication date or 'Not available'"),
              extracted_content: z
                .string()
                .describe("Full webpage content (up to 12000 characters)"),
              extraction_status: z
                .enum(["success", "failed"])
                .describe("Status of content extraction"),
              extraction_error: z
                .string()
                .optional()
                .describe("Error message if extraction failed"),
            })
          ),
        })
      )
      .describe(
        "Complete search results with extracted content for analysis agents"
      ),
    user_display: z
      .string()
      .describe(
        "Clean formatted search results for user display (no extracted content)"
      ),
  }),
  fn: ({ search_results, user_display }, context) => {
    // Save the complete search results (with extracted content) to state
    context.state.set(STATE_KEYS.SEARCH_RESULTS, search_results);

    // Return only the clean user display (without extracted content)
    return {
      success: true,
      message: user_display,
    };
  },
});
