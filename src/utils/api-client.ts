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
  body: Record<string, unknown>
): Promise<T> {
  const { apiUrl, apiToken } = getConfig();

  if (!apiToken) {
    throw new Error(
      "VIBE_API_TOKEN is not set. Get your API token at " +
        apiUrl +
        "/api-tokens"
    );
  }

  const response = await fetch(`${apiUrl}/api${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Invalid API token. Get a new one at " + apiUrl + "/api-tokens"
      );
    }
    const text = await response.text();
    throw new Error(`API error (${response.status}): ${text}`);
  }

  return response.json() as Promise<T>;
}

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

export async function generatePlan(
  projectName: string,
  projectDescription: string,
  features: string[] = []
): Promise<PlanResponse> {
  return request<PlanResponse>("/plan/generate", {
    project_name: projectName,
    project_description: projectDescription,
    features,
  });
}

export async function generateEstimate(
  projectDescription: string
): Promise<EstimateResponse> {
  return request<EstimateResponse>("/plan/estimate", {
    project_description: projectDescription,
  });
}
