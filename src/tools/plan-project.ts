import { z } from "zod";
import { generatePlan, PlanTask } from "../utils/api-client.js";
import { appendCTA, upgradeHint } from "../utils/branding.js";

export const planProjectSchema = z.object({
  project_name: z.string().describe("Name of the project to plan"),
  project_description: z
    .string()
    .describe("Detailed description of what the project should do, its goals, and target users"),
  features: z
    .array(z.string())
    .optional()
    .describe("List of key features to include (e.g. 'user auth', 'Stripe payments', 'admin dashboard')"),
});

export type PlanProjectInput = z.infer<typeof planProjectSchema>;

function formatTask(task: PlanTask, index: number): string {
  const deps =
    task.dependencies.length > 0
      ? `Dependencies: ${task.dependencies.join(", ")}`
      : "No dependencies";

  const model = task.recommended_model
    ? ` | Model: ${task.recommended_model}`
    : "";
  const complexity = task.complexity
    ? ` | Complexity: ${task.complexity}`
    : "";

  let line = `**${index + 1}. ${task.title}** (${task.estimated_hours} hrs${complexity}${model})\n`;
  line += `${task.description}\n`;
  line += `_${deps}_\n`;
  return line;
}

export async function planProject(input: PlanProjectInput): Promise<string> {
  const { project_name, project_description, features = [] } = input;

  try {
    const plan = await generatePlan(project_name, project_description, features);
    const taskCount = plan.tasks.length;

    let output = `## Project Plan: ${project_name}\n\n`;
    output += `### Tasks (${taskCount} total, ~${plan.total_hours} hours)\n\n`;

    plan.tasks.forEach((task, i) => {
      output += formatTask(task, i) + "\n";
    });

    output += `### Summary\n`;
    output += `- **Total tasks:** ${taskCount}\n`;
    output += `- **Estimated hours:** ${plan.total_hours}\n`;
    output += `- **Estimated weeks:** ${Math.ceil(plan.total_hours / 40)} (at 40 hrs/week)\n`;

    if (plan.is_demo) {
      output += upgradeHint(
        "AI-powered detailed plans with model routing and coding prompts"
      );
    }

    return appendCTA(output);
  } catch (error: any) {
    return (
      `**Error generating plan:** ${error.message}\n\n` +
      `Make sure your VIBE_API_TOKEN is set correctly.\n` +
      `Get one at https://vibecoderplanner.com/api-tokens`
    );
  }
}
