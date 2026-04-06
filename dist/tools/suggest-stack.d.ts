import { z } from "zod";
export declare const suggestStackSchema: z.ZodObject<{
    project_description: z.ZodString;
    preferences: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    project_description: string;
    preferences?: string | undefined;
}, {
    project_description: string;
    preferences?: string | undefined;
}>;
export type SuggestStackInput = z.infer<typeof suggestStackSchema>;
export declare function suggestStack(input: SuggestStackInput): Promise<string>;
//# sourceMappingURL=suggest-stack.d.ts.map