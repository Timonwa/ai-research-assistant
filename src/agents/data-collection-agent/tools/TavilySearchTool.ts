import { createTool } from "@iqai/adk";
import { tavily as createTavilyClient } from "@tavily/core";
import { z } from "zod";

/**
 * Tavily Search Tool that allows web searching.
 * Returns search results with URLs and their content in a single call.
 */
export const tavilySearchTool = createTool({
  name: "tavily_search",
  description:
    "Search the web using Tavily and return results with URLs and content",
  schema: z.object({
    query: z.string().describe("The search query to execute"),
    max_results: z
      .number()
      .optional()
      .default(5)
      .describe("Maximum number of results to return (1-20)"),
    include_raw_content: z
      .union([z.boolean(), z.enum(["markdown", "text"])])
      .optional()
      .default(true)
      .describe(
        'Include the cleaned and parsed HTML content of each search result. "markdown" or True returns search result content in markdown format. "text" returns the plain text from the results and may increase latency.'
      ),
  }),
  fn: async ({ query, max_results = 5, include_raw_content = true }) => {
    const TAVILY_API_KEY = process.env.TAVILY_API_KEY || "";

    // If no API key, return mock data for development
    if (!TAVILY_API_KEY) {
      return {
        query,
        follow_up_questions: null,
        answer: null,
        images: [],
        results: [
          {
            url: `https://example.com/search?q=${encodeURIComponent(query)}`,
            title: `Mock result for: ${query}`,
            content: `This is mock content for '${query}'. Set TAVILY_API_KEY to get real results.`,
            score: 0.5,
            raw_content:
              "<html><head><title>Test</title></head><body>Mock content</body></html>",
          },
        ],
        response_time: 0,
        request_id: "mock-0",
      };
    }

    const tavily = createTavilyClient({ apiKey: TAVILY_API_KEY });

    // Ensure max_results is within bounds
    const clampedMaxResults = Math.min(Math.max(max_results, 1), 20);

    // Perform the search with content extraction
    const response = await tavily.search(query, {
      maxResults: clampedMaxResults,
      includeRawContent:
        include_raw_content === true ? "markdown" : include_raw_content,
    });

    return response;
  },
});
