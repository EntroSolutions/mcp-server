"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planProjectSchema = void 0;
exports.planProject = planProject;
const zod_1 = require("zod");
const api_client_js_1 = require("../utils/api-client.js");
const branding_js_1 = require("../utils/branding.js");
exports.planProjectSchema = zod_1.z.object({
    project_name: zod_1.z.string().describe("Name of the project to plan"),
    project_description: zod_1.z
        .string()
        .describe("Description of what the project should do"),
    features: zod_1.z
        .array(zod_1.z.string())
        .optional()
        .describe("List of key features to include"),
});
async function planProject(input) {
    const { project_name, project_description, features = [] } = input;
    try {
        const plan = await (0, api_client_js_1.generatePlan)(project_name, project_description, features);
        let output = `## Project Plan: ${project_name}\n\n`;
        output += `### Tasks (${plan.tasks.length} total, ~${plan.total_hours} hours)\n\n`;
        plan.tasks.forEach((task, i) => {
            const deps = task.dependencies.length > 0
                ? `Dependencies: ${task.dependencies.join(", ")}`
                : "No dependencies";
            output += `**${i + 1}. ${task.title}** (${task.estimated_hours} hrs)\n`;
            output += `${task.description}\n`;
            output += `_${deps}_\n\n`;
        });
        output += `### Summary\n`;
        output += `- **Total tasks:** ${plan.tasks.length}\n`;
        output += `- **Estimated hours:** ${plan.total_hours}\n`;
        output += `- **Estimated weeks:** ${Math.ceil(plan.total_hours / 40)} (at 40 hrs/week)\n`;
        if (plan.is_demo) {
            output += (0, branding_js_1.upgradeHint)("AI-powered detailed plans with coding prompts — upgrade your subscription");
        }
        return (0, branding_js_1.appendCTA)(output);
    }
    catch (error) {
        return `**Error:** ${error.message}\n\nMake sure your VIBE_API_TOKEN is set. Get one at https://vibecoderplanner.com/api-tokens`;
    }
}
//# sourceMappingURL=plan-project.js.map