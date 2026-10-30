import { z } from "zod";
import { getProject } from "../utils/api-client.js";
import { appendCTA } from "../utils/branding.js";

export const getProjectSchema = z.object({
  project_id: z
    .number()
    .describe("The numeric ID of the project (get IDs from the list_projects tool)"),
});

export type GetProjectInput = z.infer<typeof getProjectSchema>;

export async function getProjectTasks(
  input: GetProjectInput
): Promise<string> {
  try {
    const result = await getProject(input.project_id);
    const project = result.data;
    const tasks = project.tasks || [];

    let output = `## ${project.name}\n\n`;

    if (project.description) {
      output += `${project.description}\n\n`;
    }

    if (tasks.length === 0) {
      output += `This project has no tasks yet.\n`;
      return appendCTA(output);
    }

    output += `### Tasks (${tasks.length})\n\n`;
    tasks.forEach((task, i) => {
      const hours = task.estimated_hours ? ` (${task.estimated_hours} hrs)` : "";
      const complexity = task.complexity ? ` | ${task.complexity}` : "";
      const model = task.recommended_model
        ? ` | ${task.recommended_model}`
        : "";
      output += `${i + 1}. **${task.title}**${hours}${complexity}${model}\n`;
      if (task.description) {
        output += `   ${task.description}\n`;
      }
    });

    return appendCTA(output);
  } catch (error: any) {
    return (
      `**Error fetching project:** ${error.message}\n\n` +
      `Make sure the project ID is correct. Use **list_projects** to see your projects.`
    );
  }
}
