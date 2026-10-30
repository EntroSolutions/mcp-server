#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { planProjectSchema, planProject } from "./tools/plan-project.js";
import { estimateProjectSchema, estimateProject } from "./tools/estimate-project.js";
import { suggestStackSchema, suggestStack } from "./tools/suggest-stack.js";
import { listProjectsSchema, listUserProjects } from "./tools/list-projects.js";
import { getProjectSchema, getProjectTasks } from "./tools/get-project.js";
import { createProjectSchema, createNewProject } from "./tools/create-project.js";

const server = new McpServer({
  name: "vibe-coding-plan",
  version: "2.0.0",
});

server.tool(
  "plan_coding_project",
  `Generate a detailed, actionable development plan for any software project. Returns a structured task breakdown with:
- Task titles, descriptions, and acceptance criteria
- Time estimates per task (in hours)
- Task dependencies and ordering
- Complexity ratings (high/medium/low)
- Recommended AI model per task (Claude, DeepSeek, Copilot, Kimi)
- Cost estimates for AI-assisted development

Best for: "Plan a SaaS app with auth and payments", "Break down a mobile fitness tracker into tasks"`,
  planProjectSchema.shape,
  async (input) => {
    const result = await planProject(input);
    return { content: [{ type: "text", text: result }] };
  }
);

server.tool(
  "estimate_project",
  `Get a quick time and complexity estimate for a software project without generating the full plan. Returns:
- Total estimated hours
- Complexity rating (Low / Medium / High / Very High)
- Estimated weeks of development
- High-level development phases

Best for: "How long would it take to build a chat app?", "Estimate complexity of an e-commerce platform"`,
  estimateProjectSchema.shape,
  async (input) => {
    const result = await estimateProject(input);
    return { content: [{ type: "text", text: result }] };
  }
);

server.tool(
  "suggest_tech_stack",
  `Recommend a technology stack for a software project based on its requirements and developer preferences. Returns categorized recommendations for:
- Frontend framework
- Backend framework
- Database
- Hosting & deployment

Each recommendation includes reasoning. Supports preference constraints like "I prefer Python" or "must be serverless".

Best for: "What tech stack for a real-time collaboration tool?", "Best stack for a multi-tenant B2B platform?"`,
  suggestStackSchema.shape,
  async (input) => {
    const result = await suggestStack(input);
    return { content: [{ type: "text", text: result }] };
  }
);

server.tool(
  "list_projects",
  `List all projects in the user's Vibe Coding Plan account. Returns project names, IDs, task counts, and creation dates. Use this to browse existing projects before fetching details.`,
  listProjectsSchema.shape,
  async () => {
    const result = await listUserProjects();
    return { content: [{ type: "text", text: result }] };
  }
);

server.tool(
  "get_project_tasks",
  `Get the full task list for a specific project by its ID. Returns task titles, descriptions, time estimates, complexity, and recommended AI models. Use list_projects first to find the project ID.`,
  getProjectSchema.shape,
  async (input) => {
    const result = await getProjectTasks(input);
    return { content: [{ type: "text", text: result }] };
  }
);

server.tool(
  "create_project",
  `Create a new project in the user's Vibe Coding Plan account. Returns the project ID. After creating, use plan_coding_project to generate tasks for it.`,
  createProjectSchema.shape,
  async (input) => {
    const result = await createNewProject(input);
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
