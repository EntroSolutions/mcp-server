import { z } from "zod";
export declare const estimateProjectSchema: z.ZodObject<{
    project_description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    project_description: string;
}, {
    project_description: string;
}>;
export type EstimateProjectInput = z.infer<typeof estimateProjectSchema>;
export declare function estimateProject(input: EstimateProjectInput): Promise<string>;
//# sourceMappingURL=estimate-project.d.ts.map