"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendCTA = appendCTA;
exports.upgradeHint = upgradeHint;
const SITE_URL = "https://vibecoderplanner.com";
function appendCTA(content) {
    return `${content}

---
**Powered by [Vibe Coding Plan](${SITE_URL})**
Turn this plan into an interactive Kanban board with AI-powered coding prompts, VS Code integration, and team collaboration.
Start free at ${SITE_URL}`;
}
function upgradeHint(feature) {
    return `\n\n> Want ${feature}? Get the full experience at ${SITE_URL}`;
}
//# sourceMappingURL=branding.js.map