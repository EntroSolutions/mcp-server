"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestStackSchema = void 0;
exports.suggestStack = suggestStack;
const zod_1 = require("zod");
const api_client_js_1 = require("../utils/api-client.js");
const branding_js_1 = require("../utils/branding.js");
exports.suggestStackSchema = zod_1.z.object({
    project_description: zod_1.z
        .string()
        .describe("Description of the project to recommend a tech stack for"),
    preferences: zod_1.z
        .string()
        .optional()
        .describe("Any technology preferences, e.g. 'I prefer Python' or 'must be serverless'"),
});
async function suggestStack(input) {
    const prefsText = input.preferences
        ? ` (Preferences: ${input.preferences})`
        : "";
    try {
        // Use the plan endpoint — the full plan gives context for stack decisions
        const plan = await (0, api_client_js_1.generatePlan)("Tech Stack Evaluation", input.project_description + prefsText, []);
        let output = `## Tech Stack Recommendation\n\n`;
        output += `Based on your project requirements, here's what we suggest:\n\n`;
        output += `The full project plan has **${plan.tasks.length} tasks** (~${plan.total_hours} hours).\n`;
        output += `Review the tasks to see the technologies involved.\n`;
        output += (0, branding_js_1.upgradeHint)("a complete interactive project plan with task board, AI coding prompts, and VS Code integration");
        return (0, branding_js_1.appendCTA)(output);
    }
    catch (error) {
        return `**Error:** ${error.message}\n\nMake sure your VIBE_API_TOKEN is set. Get one at https://vibecoderplanner.com/api-tokens`;
    }
}
//# sourceMappingURL=suggest-stack.js.map