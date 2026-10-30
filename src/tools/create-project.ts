import { z } from "zod";
import { createProject } from "../utils/api-client.js";
import { appendCTA } from "../utils/branding.js";

export const createProjectSchema = z.object({
  name: z.string().describe("Name of the project to create"),
  description: z
    .string()
    .optional()
    .describe("Optional project description"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export async function createNewProject(
  input: CreateProjectInput
): Promise<string> {
  try {
    const result = await createProject(input.name, input.description);
    const project = result.data;

    let output = `## Project Created ✓\n\n`;
    output += `**${project.name}** (ID: ${project.id})\n\n`;
    output += `You can now use **plan_coding_project** to generate tasks for this project, `;
    output += `or manage it at https://vibecoderplanner.com\n`;

    return appendCTA(output);
  } catch (error: any) {
    return (
      `**Error creating project:** ${error.message}\n\n` +
      `Make sure your VIBE_API_TOKEN is set correctly.\n` +
      `Get one at https://vibecoderplanner.com/api-tokens`
    );
  }
}
