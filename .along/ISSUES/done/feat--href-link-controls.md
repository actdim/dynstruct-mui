---
protocol: along
protocol_version: "4.5.3"
slug: href-link-controls
type: feat
status: done
completed: 2026-10-24
priority: high
created: 2026-10-24
updated: 2026-10-24
agent: claude-code
tags: [navigation]
milestone: v2.0.0
parent: feat--nav-links-middle-click
blocked_by: []
related: []
---

# href on Button, IconButton, List and Menu items (real links, SPA plain click)

Child of the mempart issue `feat--nav-links-middle-click` (dynstruct `feat--nav-link`).

## Requirements
- REQ-1: `Button`, `IconButton` accept `href` / `target` and render an `<a>`; `onClick` receives the event.
- REQ-2: List items and menu items accept `href`; the item renders an `<a>`.
- REQ-3: A plain left click on an app href navigates through `APP.NAV.GOTO` (no reload); modified and middle clicks
  open the link natively (new tab); a menu closes on any item click.

## Acceptance Criteria
- [x] Controls with `href` render anchors
- [x] Plain click goes through the bus, modified click does not
- [x] Automated tests passing (tests/hrefLinks.test.ts; mempart e2e navLinks.spec.ts)
