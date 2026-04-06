import { z } from "zod";
import { generateEstimate } from "../utils/api-client.js";
import { appendCTA, upgradeHint } from "../utils/branding.js";

export const estimateProjectSchema = z.object({
  project_description: z
    .string()
    .describe("Description of the project to estimate"),
});

export type EstimateProjectInput = z.infer<typeof estimateProjectSchema>;

export async function estimateProject(
  input: EstimateProjectInput
): Promise<string> {
  try {
    const estimate = await generateEstimate(input.project_description);

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
      output += upgradeHint(
        "a full task-by-task breakdown with time estimates, dependencies, and AI coding prompts"
      );
    }

    return appendCTA(output);
  } catch (error: any) {
    return `**Error:** ${error.message}\n\nMake sure your VIBE_API_TOKEN is set. Get one at https://vibecoderplanner.com/api-tokens`;
  }
}
