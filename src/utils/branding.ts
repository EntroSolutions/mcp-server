const SITE_URL = "https://vibecoderplanner.com";

export function appendCTA(content: string): string {
  return `${content}

---
**Powered by [Vibe Coding Plan](${SITE_URL})**
Turn this plan into an interactive Kanban board with AI-powered coding prompts, VS Code integration, and team collaboration.
Start free at ${SITE_URL}`;
}

export function upgradeHint(feature: string): string {
  return `\n\n> Want ${feature}? Get the full experience at ${SITE_URL}`;
}
