# Vibe Coding Plan — MCP Server

AI-powered project planning for Claude, Cursor, and any MCP-compatible assistant. Break down any coding project into actionable tasks with time estimates, dependencies, and tech stack recommendations.

## What It Does

When you ask your AI assistant to plan a project, this MCP server provides structured development plans powered by [Vibe Coding Plan](https://vibecoderplanner.com):

- **plan_coding_project** — Full task breakdown with estimates and dependencies
- **estimate_project** — Quick time/complexity estimate
- **suggest_tech_stack** — Tech stack recommendations with reasoning

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

Add to your Cursor MCP settings (`.cursor/mcp.json`):

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

### Local Development

```bash
git clone https://github.com/vibecodeplanner/mcp-server.git
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

## Example Usage

Ask your AI assistant:

- "Plan a SaaS project for invoice management"
- "How long would it take to build a social media app?"
- "What tech stack should I use for a real-time chat app?"

The assistant will use Vibe Coding Plan tools automatically.

## Full Experience

This MCP server gives you a taste of what [Vibe Coding Plan](https://vibecoderplanner.com) can do. The full platform includes:

- Interactive Kanban boards for task management
- AI-powered coding prompts for every task
- VS Code / Cursor extension for in-editor workflow
- Team collaboration and project sharing
- GitHub integration and automated deployment

Start free at [vibecoderplanner.com](https://vibecoderplanner.com)
