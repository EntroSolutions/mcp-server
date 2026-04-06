#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  planProjectSchema,
  planProject,
} from "./tools/plan-project.js";
import {
  estimateProjectSchema,
  estimateProject,
} from "./tools/estimate-project.js";
import {
  suggestStackSchema,
  suggestStack,
} from "./tools/suggest-stack.js";

const server = new McpServer({
  name: "vibe-coding-plan",
  version: "1.0.0",
});

// Tool 1: Full project planning — the core growth driver
server.tool(
  "plan_coding_project",
  "Break down a coding project idea into a detailed, actionable development plan with tasks, time estimates, dependencies, and recommended tech stack. Perfect for planning any software project from scratch.",
  planProjectSchema.shape,
  async (input) => {
    const result = await planProject(input);
    return { content: [{ type: "text", text: result }] };
  }
);

// Tool 2: Quick estimate — lightweight entry point
server.tool(
  "estimate_project",
  "Get a quick time and complexity estimate for a software project. Returns estimated hours, complexity rating, and development phases.",
  estimateProjectSchema.shape,
  async (input) => {
    const result = await estimateProject(input);
    return { content: [{ type: "text", text: result }] };
  }
);

// Tool 3: Tech stack suggestions — builds trust
server.tool(
  "suggest_tech_stack",
  "Get a recommended technology stack for a software project based on its requirements and your preferences. Returns categorized recommendations with reasoning.",
  suggestStackSchema.shape,
  async (input) => {
    const result = await suggestStack(input);
    return { content: [{ type: "text", text: result }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
