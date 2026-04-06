"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateProjectSchema = void 0;
exports.estimateProject = estimateProject;
const zod_1 = require("zod");
const api_client_js_1 = require("../utils/api-client.js");
const branding_js_1 = require("../utils/branding.js");
exports.estimateProjectSchema = zod_1.z.object({
    project_description: zod_1.z
        .string()
        .describe("Description of the project to estimate"),
});
async function estimateProject(input) {
    try {
        const estimate = await (0, api_client_js_1.generateEstimate)(input.project_description);
        let output = `## Project Estimate\n\n`;
        output += `**Complexity:** ${estimate.complexity}\n`;
        output += `**Estimated Hours:** ${estimate.hours}\n`;
        output += `**Estimated Weeks:** ${Math.ceil(estimate.hours / 40)} (at 40 hrs/week)\n\n`;
        if (estimate.phases.length > 0) {
            output += `### Development Phases\n`;
            estimate.phases.forEach((phase, i) => {
                output += `${i + 1}. ${phase}\n`;
            });
        }
        if (estimate.is_demo) {
            output += (0, branding_js_1.upgradeHint)("a full task-by-task breakdown with time estimates, dependencies, and AI coding prompts");
        }
        return (0, branding_js_1.appendCTA)(output);
    }
    catch (error) {
        return `**Error:** ${error.message}\n\nMake sure your VIBE_API_TOKEN is set. Get one at https://vibecoderplanner.com/api-tokens`;
    }
}
//# sourceMappingURL=estimate-project.js.map