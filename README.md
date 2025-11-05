# AI Research Assistant

A sophisticated research assistant built with ADK-TS that conducts web research, analyzes findings, and generates comprehensive structured reports on any topic.

## Features

🔍 **Web Research**: Uses Google Search to gather information from multiple sources  
📊 **Intelligent Analysis**: Analyzes and synthesizes research findings with expert consensus  
📝 **Professional Reports**: Creates structured reports with actionable insights  
🤖 **Sequential Workflow**: Three specialized agents working together seamlessly  
🛡️ **Loop Prevention**: Advanced transfer controls prevent infinite agent loops  
💬 **Interactive Interface**: User-friendly greeting and topic confirmation system  
🎯 **Topic Agnostic**: Works with any research topic (technology, business, health, etc.)

## Architecture

The AI Research Assistant uses a sequential agent workflow with specialized roles:

1. **Data Collection Agent** - Conducts comprehensive web searches and gathers raw data
2. **Analysis Agent** - Analyzes findings, identifies patterns, and extracts key insights  
3. **Writer Agent** - Creates polished, structured reports with recommendations

### Data Flow Diagram

Each agent automatically accesses previous agent's output via session state with transfer controls to prevent loops.

```text
User Input → Interactive Greeting
    ↓
Data Collection Agent
├─ Uses: Google Search tool
├─ Creates: Raw research findings with full content
├─ Saves: session.state['research_findings']
├─ Transfer Control: disallowTransferToParent/Peers: true
    ↓
Analysis Agent
├─ Reads: {research_findings}
├─ Creates: Analytical insights and expert consensus
├─ Saves: session.state['summarized_insights']
├─ Transfer Control: disallowTransferToParent/Peers: true
    ↓
Writer Agent
├─ Reads: {research_findings} + {summarized_insights}
├─ Creates: Comprehensive research report
├─ Saves: session.state['final_report']
├─ Transfer Control: disallowTransferToParent/Peers: true
    ↓
User Gets: Formatted Research Report
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

```text
├── src/
│   ├── agents/
│   │   ├── agent.ts              # Root orchestrator agent
│   │   ├── data-collection-agent/ # Web research specialist
│   │   │   └── agent.ts
│   │   ├── analysis-agent/       # Content analysis specialist  
│   │   │   └── agent.ts
│   │   └── writer-agent/         # Report writing specialist
│   │       └── agent.ts
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

- `src/agents/data-collection-agent/agent.ts` - Research methodology and search strategy
- `src/agents/analysis-agent/agent.ts` - Analysis approach and synthesis rules
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

2. **Data Collection Phase**:
   - Searches for recent renewable energy developments
   - Gathers information from multiple sources
   - Collects statistics, trends, and expert insights

3. **Analysis Phase**:
   - Identifies key themes and patterns
   - Extracts most important findings
   - Organizes information by relevance and consensus

4. **Writing Phase**:
   - Creates structured report with clear sections
   - Adds context and implications
   - Provides actionable recommendations

## Learn More

- [ADK-TS Documentation](https://adk.iqai.com) - Framework documentation
- [Google Search API](https://developers.google.com/custom-search/v1/overview) - Search API setup

## Support

If you encounter any issues:

- Create an issue on GitHub
- Start a discussion on the ADK-TS repository

## License

MIT

## TO DO

- [ ] Update `.env` and `env.ts` to use gemini model by default
- [ ] Update README and package.json with current features
