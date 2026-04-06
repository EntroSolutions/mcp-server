export interface PlanTask {
    title: string;
    description: string;
    estimated_hours: number;
    dependencies: string[];
}
export interface PlanResponse {
    tasks: PlanTask[];
    total_hours: number;
    is_demo: boolean;
}
export interface EstimateResponse {
    hours: number;
    complexity: string;
    phases: string[];
    is_demo: boolean;
}
export declare function generatePlan(projectName: string, projectDescription: string, features?: string[]): Promise<PlanResponse>;
export declare function generateEstimate(projectDescription: string): Promise<EstimateResponse>;
//# sourceMappingURL=api-client.d.ts.map