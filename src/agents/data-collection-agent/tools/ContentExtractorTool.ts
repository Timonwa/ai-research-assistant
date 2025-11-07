import { createTool } from "@iqai/adk";
import { z } from "zod";
import * as cheerio from "cheerio";

/**
 * Fetches webpage HTML and extracts the readable text content.
 * @param args The arguments object containing the URL
 * @param args.url The URL of the webpage to extract content from
 * @returns The extracted readable text content from the webpage
 */
const extractContent = async (args: { url: string }) => {
  const { url } = args;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return `Error: Failed to fetch ${url} (${res.status})`;

    const html = await res.text();
    const $ = cheerio.load(html);

    // remove scripts & styles
    $("script, style, noscript").remove();

    const text = $("body").text().replace(/\s+/g, " ").trim();
    return text.slice(0, 4000); // limit length for safety
  } catch (err: any) {
    return `Error fetching ${url}: ${err.message}`;
  }
};

export const contentExtractorTool = createTool({
  name: "extract_content_tool",
  description: "Fetches webpage HTML and extracts the readable text content.",
  schema: z.object({
    url: z.string().url("Must be a valid URL"),
  }),
  fn: extractContent,
});
