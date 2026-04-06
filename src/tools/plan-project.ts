import { z } from "zod";
import { generatePlan } from "../utils/api-client.js";
import { appendCTA, upgradeHint } from "../utils/branding.js";

export const planProjectSchema = z.object({
  project_name: z.string().describe("Name of the project to plan"),
  project_description: z
    .string()
    .describe("Description of what the project should do"),
  features: z
    .array(z.string())
    .optional()
    .describe("List of key features to include"),
});

export type PlanProjectInput = z.infer<typeof planProjectSchema>;

export async function planProject(input: PlanProjectInput): Promise<string> {
  const { project_name, project_description, features = [] } = input;

  try {
    const plan = await generatePlan(project_name, project_description, features);

    let output = `## Project Plan: ${project_name}\n\n`;

    output += `### Tasks (${plan.tasks.length} total, ~${plan.total_hours} hours)\n\n`;

    plan.tasks.forEach((task, i) => {
      const deps =
        task.dependencies.length > 0
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
      output += upgradeHint(
        "AI-powered detailed plans with coding prompts — upgrade your subscription"
      );
    }

    return appendCTA(output);
  } catch (error: any) {
    return `**Error:** ${error.message}\n\nMake sure your VIBE_API_TOKEN is set. Get one at https://vibecoderplanner.com/api-tokens`;
  }
}
