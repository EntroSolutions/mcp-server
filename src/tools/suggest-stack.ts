import { z } from "zod";
import { suggestStack as suggestStackApi } from "../utils/api-client.js";
import { appendCTA } from "../utils/branding.js";

export const suggestStackSchema = z.object({
  project_description: z
    .string()
    .describe(
      "Description of the project — what it does, target users, and key requirements"
    ),
  preferences: z
    .string()
    .optional()
    .describe(
      "Technology preferences or constraints, e.g. 'I prefer Python', 'must be serverless', 'needs real-time'"
    ),
});

export type SuggestStackInput = z.infer<typeof suggestStackSchema>;

export async function suggestStack(
  input: SuggestStackInput
): Promise<string> {
  try {
    const result = await suggestStackApi(
      input.project_description,
      input.preferences
    );

    let output = `## Tech Stack Recommendation\n\n`;

    if (result.categories.length === 0) {
      output += `No specific recommendations could be generated. Try adding more detail to your project description.\n`;
      return appendCTA(output);
    }

    output += `| Category | Recommendation | Why |\n`;
    output += `|----------|---------------|-----|\n`;
    result.categories.forEach((cat) => {
      output += `| ${cat.category} | **${cat.recommendation}** | ${cat.reason} |\n`;
    });

    output += `\n> Want a full execution plan with task-by-task model routing and cost estimates? `;
    output += `Use the **plan_coding_project** tool or visit https://vibecoderplanner.com\n`;

    return appendCTA(output);
  } catch (error: any) {
    return (
      `**Error suggesting tech stack:** ${error.message}\n\n` +
      `Make sure your VIBE_API_TOKEN is set correctly.\n` +
      `Get one at https://vibecoderplanner.com/api-tokens`
    );
  }
}
