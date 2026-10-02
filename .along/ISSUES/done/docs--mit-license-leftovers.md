---
protocol: along
protocol_version: "4.4.1"
slug: mit-license-leftovers
type: docs
status: done
completed: 2026-10-02
priority: high
created: 2026-10-02
updated: 2026-10-02
agent: claude-code
tags: [license, docs, release]
milestone: v2.0.0-along-transition
blocked_by: []
related: []
---

# Docs: remove leftover "Proprietary" license text

`package.json` and `LICENSE` are MIT, but the README badge and License section and `llms-full.txt` still say Proprietary, and `LICENSE` names the wrong package (`@actdim/msgmesh`).

## Acceptance Criteria
- [ ] README badge and License section say MIT
- [ ] `llms-full.txt` has no "Proprietary"
- [ ] `LICENSE` copyright line names `@actdim/dynstruct-mui`
