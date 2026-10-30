const DEFAULT_API_URL = "https://vibecoderplanner.com";

function getConfig(): { apiUrl: string; apiToken: string | null } {
  const apiUrl = (
    process.env.VIBE_API_URL || DEFAULT_API_URL
  ).replace(/\/+$/, "");
  const apiToken = process.env.VIBE_API_TOKEN || null;
  return { apiUrl, apiToken };
}

async function request<T>(
  path: string,
  method: "GET" | "POST",
  body?: Record<string, unknown>
): Promise<T> {
  const { apiUrl, apiToken } = getConfig();

  if (!apiToken) {
    throw new Error(
      "VIBE_API_TOKEN is not set. Get your API token at " +
        apiUrl +
        "/api-tokens"
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${apiToken}`,
  };

  const options: RequestInit = { method, headers };
  if (body && method === "POST") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${apiUrl}/api${path}`, options);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Invalid API token. Get a new one at " + apiUrl + "/api-tokens"
      );
    }
    if (response.status === 403) {
      throw new Error(
        "Access denied. You may need a Pro subscription for this feature. " +
          "Upgrade at " + apiUrl + "/pricing"
      );
    }
    const text = await response.text();
    throw new Error(`API error (${response.status}): ${text}`);
  }

  return response.json() as Promise<T>;
}

// ---------- Type definitions ----------

export interface PlanTask {
  title: string;
  description: string;
  estimated_hours: number;
  dependencies: string[];
  complexity?: string;
  recommended_model?: string;
  estimated_cost?: number;
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

export interface StackCategory {
  category: string;
  recommendation: string;
  reason: string;
}

export interface StackResponse {
  categories: StackCategory[];
}

export interface ProjectSummary {
  id: number;
  name: string;
  description: string | null;
  tasks_count?: number;
  created_at: string;
}

export interface ProjectDetail {
  id: number;
  name: string;
  description: string | null;
  tasks: PlanTask[];
}

export interface ProjectsListResponse {
  data: ProjectSummary[];
  meta: { current_page: number; total: number; per_page: number };
}

// ---------- API calls ----------

export async function generatePlan(
  projectName: string,
  projectDescription: string,
  features: string[] = []
): Promise<PlanResponse> {
  return request<PlanResponse>("/plan/generate", "POST", {
    project_name: projectName,
    project_description: projectDescription,
    features,
  });
}

export async function generateEstimate(
  projectDescription: string
): Promise<EstimateResponse> {
  return request<EstimateResponse>("/plan/estimate", "POST", {
    project_description: projectDescription,
  });
}

export async function suggestStack(
  projectDescription: string,
  preferences?: string
): Promise<StackResponse> {
  return request<StackResponse>("/plan/suggest-stack", "POST", {
    project_description: projectDescription,
    preferences: preferences || "",
  });
}

export async function listProjects(): Promise<ProjectsListResponse> {
  return request<ProjectsListResponse>("/projects", "GET");
}

export async function getProject(
  projectId: number
): Promise<{ data: ProjectDetail }> {
  return request<{ data: ProjectDetail }>(`/projects/${projectId}`, "GET");
}

export async function createProject(
  name: string,
  description?: string
): Promise<{ data: ProjectSummary; message: string }> {
  return request<{ data: ProjectSummary; message: string }>(
    "/projects",
    "POST",
    { name, description: description || "" }
  );
}
