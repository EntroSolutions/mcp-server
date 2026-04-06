#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const plan_project_js_1 = require("./tools/plan-project.js");
const estimate_project_js_1 = require("./tools/estimate-project.js");
const suggest_stack_js_1 = require("./tools/suggest-stack.js");
const server = new mcp_js_1.McpServer({
    name: "vibe-coding-plan",
    version: "1.0.0",
});
// Tool 1: Full project planning — the core growth driver
server.tool("plan_coding_project", "Break down a coding project idea into a detailed, actionable development plan with tasks, time estimates, dependencies, and recommended tech stack. Perfect for planning any software project from scratch.", plan_project_js_1.planProjectSchema.shape, async (input) => {
    const result = await (0, plan_project_js_1.planProject)(input);
    return { content: [{ type: "text", text: result }] };
});
// Tool 2: Quick estimate — lightweight entry point
server.tool("estimate_project", "Get a quick time and complexity estimate for a software project. Returns estimated hours, complexity rating, and development phases.", estimate_project_js_1.estimateProjectSchema.shape, async (input) => {
    const result = await (0, estimate_project_js_1.estimateProject)(input);
    return { content: [{ type: "text", text: result }] };
});
// Tool 3: Tech stack suggestions — builds trust
server.tool("suggest_tech_stack", "Get a recommended technology stack for a software project based on its requirements and your preferences. Returns categorized recommendations with reasoning.", suggest_stack_js_1.suggestStackSchema.shape, async (input) => {
    const result = await (0, suggest_stack_js_1.suggestStack)(input);
    return { content: [{ type: "text", text: result }] };
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
}
main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map