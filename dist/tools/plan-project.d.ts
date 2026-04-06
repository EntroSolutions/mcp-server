import { z } from "zod";
export declare const planProjectSchema: z.ZodObject<{
    project_name: z.ZodString;
    project_description: z.ZodString;
    features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    project_name: string;
    project_description: string;
    features?: string[] | undefined;
}, {
    project_name: string;
    project_description: string;
    features?: string[] | undefined;
}>;
export type PlanProjectInput = z.infer<typeof planProjectSchema>;
export declare function planProject(input: PlanProjectInput): Promise<string>;
//# sourceMappingURL=plan-project.d.ts.map