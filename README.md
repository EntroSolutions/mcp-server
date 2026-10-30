# Vibe Coding Plan — MCP Server

AI-powered project planning for Claude, Cursor, and any MCP-compatible assistant. Break down any coding project into actionable tasks with time estimates, AI model routing, and cost optimization.

## Tools

| Tool | Description |
|------|-------------|
| **plan_coding_project** | Full task breakdown with estimates, dependencies, complexity, and recommended AI model per task |
| **estimate_project** | Quick time/complexity estimate with development phases |
| **suggest_tech_stack** | Tech stack recommendations (frontend, backend, DB, hosting) with reasoning |
| **list_projects** | Browse your existing Vibe Coding Plan projects |
| **get_project_tasks** | View tasks for a specific project by ID |
| **create_project** | Create a new project in your account |

## Setup

### 1. Get Your API Token

Sign up at [vibecoderplanner.com](https://vibecoderplanner.com) and generate an API token at [vibecoderplanner.com/api-tokens](https://vibecoderplanner.com/api-tokens).

### 2. Configure Your MCP Client

#### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vibe-coding-plan": {
      "command": "npx",
      "args": ["-y", "vibe-coding-plan-mcp"],
      "env": {
        "VIBE_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

#### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "vibe-coding-plan": {
      "command": "npx",
      "args": ["-y", "vibe-coding-plan-mcp"],
      "env": {
        "VIBE_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VIBE_API_TOKEN` | Yes | Your API token from [vibecoderplanner.com/api-tokens](https://vibecoderplanner.com/api-tokens) |
| `VIBE_API_URL` | No | Override the API base URL (defaults to `https://vibecoderplanner.com`) |

## Example Prompts

Once connected, ask your AI assistant naturally:

- "Plan a SaaS project for invoice management with Stripe integration"
- "How long would it take to build a real-time chat app with WebSockets?"
- "What tech stack should I use for a multi-tenant B2B platform?"
- "Show me my existing projects"
- "Break down a mobile fitness tracker app into tasks with cost estimates"

## Local Development

```bash
git clone https://github.com/EntroSolutions/mcp-server.git
cd mcp-server
npm install
npm run build
```

Then point your MCP client to:
```json
{
  "command": "node",
  "args": ["path/to/mcp-server/dist/index.js"],
  "env": {
    "VIBE_API_TOKEN": "your-api-token-here"
  }
}
```

## Full Experience

This MCP server gives you a taste of what [Vibe Coding Plan](https://vibecoderplanner.com) can do. The full platform includes:

- Interactive Kanban boards for task management
- AI-powered coding prompts optimized per model
- Smart model routing — Claude for architecture, DeepSeek for CRUD
- VS Code / Cursor extension for in-editor workflow
- GitHub integration and automated PR creation
- Cost savings of 60%+ on AI development

Start free at [vibecoderplanner.com](https://vibecoderplanner.com)
