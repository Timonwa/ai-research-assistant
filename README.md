# AI Research Assistant

A sophisticated research assistant built with ADK-TS that conducts web research, analyzes findings, and generates comprehensive structured reports on any topic.

## Features

🔍 **Web Research**: Uses Google Search to gather information from multiple sources  
📊 **Intelligent Summarization**: Analyzes and synthesizes research findings  
📝 **Report Generation**: Creates professional, structured reports with actionable insights  
🤖 **Sequential Workflow**: Three specialized agents working together seamlessly  

## Architecture

The AI Research Assistant uses a sequential agent workflow:

1. **Research Agent** - Conducts comprehensive web searches using Google Search tool
2. **Summarizer Agent** - Analyzes findings and extracts key insights  
3. **Writer Agent** - Creates polished, structured reports

### Data Flow Diagram

Each agent automatically accesses previous agent's output via session state.

```text
User Input
    ↓
Research Agent
├─ Uses: Google Search tool
├─ Creates: Raw findings
└─ Saves: session.state['research_findings']
    ↓
Summarizer Agent
├─ Reads: {research_findings?}
├─ Creates: Structured insights
└─ Saves: session.state['summarized_insights']
    ↓
Writer Agent
├─ Reads: {research_findings?} + {summarized_insights?}
├─ Creates: Formatted report
└─ Saves: session.state['final_report']
    ↓
User Gets: Final Research Report
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Google API key for web search functionality

### Installation

1. Clone this repository

```bash
git clone <repository-url>
cd ai-research-assistant
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
GOOGLE_API_KEY=your_google_api_key_here
LLM_MODEL=gemini-2.5-flash
ADK_DEBUG=false
```

### Running the Assistant

```bash
# Development mode (with hot reloading)
pnpm dev

# Production build and run
pnpm build
pnpm start

# Interactive testing with ADK CLI
adk run   # CLI chat interface
adk web   # Web interface
```

## Usage

The assistant can research any topic and generate comprehensive reports. Example queries:

- "Latest trends in renewable energy technology 2024"
- "Impact of artificial intelligence on healthcare industry"
- "Cybersecurity threats and solutions for small businesses"
- "Market analysis for electric vehicles in Europe"
- "Recent developments in quantum computing"

## Output Format

The assistant generates structured reports including:

- **Executive Summary** - Key findings overview
- **Detailed Findings** - In-depth analysis with sources
- **Trends & Developments** - Recent changes and patterns
- **Supporting Data** - Statistics and key metrics
- **Conclusions & Recommendations** - Actionable insights
- **Sources & References** - Quality-assessed source list

## Project Structure

```
├── src/
│   ├── agents/
│   │   ├── agent.ts              # Root orchestrator agent
│   │   ├── research-agent/       # Web research specialist
│   │   │   └── agent.ts
│   │   ├── summarizer-agent/     # Content synthesis specialist  
│   │   │   └── agent.ts
│   │   └── writer-agent/         # Report writing specialist
│   │       └── agent.ts
│   ├── tools/                    # Custom tools (if needed)
│   ├── env.ts                    # Environment configuration
│   └── index.ts                  # Main execution entry
```

## Configuration

### Environment Variables

- `GOOGLE_API_KEY` - Required for web search functionality
- `LLM_MODEL` - AI model to use (default: gemini-2.5-flash)  
- `ADK_DEBUG` - Enable debug logging (default: false)

### Customization

Each agent can be customized by modifying their instruction sets in:

- `src/agents/research-agent/agent.ts` - Research methodology and search strategy
- `src/agents/summarizer-agent/agent.ts` - Analysis approach and synthesis rules
- `src/agents/writer-agent/agent.ts` - Report format and writing style

## Development Commands

```bash
pnpm dev        # Development mode with hot reloading
pnpm build      # Build TypeScript project  
pnpm start      # Run built project
pnpm clean      # Clean build artifacts
```

## Testing Your Agent

**Traditional Testing**: Run `pnpm dev` to execute sample research queries.

**Interactive Testing with ADK CLI**:

1. Install: `npm install -g @iqai/adk-cli`
2. Run: `adk run` for CLI chat or `adk web` for web interface
3. Perfect for development, testing, and demonstrating capabilities

## API Integration

The research assistant uses:

- **Google Search API** - For web search capabilities
- **Gemini AI Models** - For language processing and generation

Make sure to obtain proper API keys and configure them in your `.env` file.

## Example Workflow

1. **Input**: "Latest trends in renewable energy technology 2024"

2. **Research Phase**:
   - Searches for recent renewable energy developments
   - Gathers information from multiple sources
   - Collects statistics, trends, and expert insights

3. **Summarization Phase**:
   - Identifies key themes and patterns
   - Extracts most important findings
   - Organizes information by relevance

4. **Writing Phase**:
   - Creates structured report with clear sections
   - Adds context and implications
   - Provides actionable recommendations

## Learn More

- [ADK-TS Documentation](https://docs.adk.ai) - Framework documentation
- [Google Search API](https://developers.google.com/custom-search) - Search API setup
- [Agent Development Guide](https://docs.adk.ai/guides/agents) - Building custom agents

## Support

If you encounter any issues:

- Create an issue on GitHub
- Start a discussion on the ADK-TS repository

## License

MIT

## TO DO

- [ ] Update `.env` and `env.ts` to use gemini model by default
