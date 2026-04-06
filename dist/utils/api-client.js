"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePlan = generatePlan;
exports.generateEstimate = generateEstimate;
const DEFAULT_API_URL = "https://vibecoderplanner.com";
function getConfig() {
    const apiUrl = (process.env.VIBE_API_URL || DEFAULT_API_URL).replace(/\/+$/, "");
    const apiToken = process.env.VIBE_API_TOKEN || null;
    return { apiUrl, apiToken };
}
async function request(path, body) {
    const { apiUrl, apiToken } = getConfig();
    if (!apiToken) {
        throw new Error("VIBE_API_TOKEN is not set. Get your API token at " +
            apiUrl +
            "/api-tokens");
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
            throw new Error("Invalid API token. Get a new one at " + apiUrl + "/api-tokens");
        }
        const text = await response.text();
        throw new Error(`API error (${response.status}): ${text}`);
    }
    return response.json();
}
async function generatePlan(projectName, projectDescription, features = []) {
    return request("/plan/generate", {
        project_name: projectName,
        project_description: projectDescription,
        features,
    });
}
async function generateEstimate(projectDescription) {
    return request("/plan/estimate", {
        project_description: projectDescription,
    });
}
//# sourceMappingURL=api-client.js.map