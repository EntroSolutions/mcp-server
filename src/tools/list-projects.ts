import { z } from "zod";
import { listProjects } from "../utils/api-client.js";

export const listProjectsSchema = z.object({});

export async function listUserProjects(): Promise<string> {
  try {
    const result = await listProjects();
    const projects = result.data;

    if (projects.length === 0) {
      return (
        `You have no projects yet.\n\n` +
        `Use the **plan_coding_project** tool to generate your first plan, ` +
        `or create one at https://vibecoderplanner.com`
      );
    }

    let output = `## Your Projects (${result.meta.total} total)\n\n`;
    output += `| # | Name | Tasks | Created |\n`;
    output += `|---|------|-------|---------|\n`;

    projects.forEach((p, i) => {
      const date = new Date(p.created_at).toLocaleDateString();
      const tasks = p.tasks_count ?? "–";
      output += `| ${i + 1} | **${p.name}** (ID: ${p.id}) | ${tasks} | ${date} |\n`;
    });

    output += `\nUse the **get_project_tasks** tool with a project ID to see its tasks.`;
    return output;
  } catch (error: any) {
    return (
      `**Error listing projects:** ${error.message}\n\n` +
      `Make sure your VIBE_API_TOKEN is set correctly.\n` +
      `Get one at https://vibecoderplanner.com/api-tokens`
    );
  }
}
