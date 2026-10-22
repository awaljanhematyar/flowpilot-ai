# Verification record

This record reports actual results only. The application is a portfolio demonstration, not a production AI service.

## Scope

Marketing: `/`, `/features`, `/how-it-works`, `/pricing`, `/resources`, six `/resources/:slug` pages, `/about`, `/contact`, `/login`, `/signup`, and a custom 404. `/blog` redirects to `/resources`.

Workspace: `/dashboard` with overview, tasks, projects, insights and predefined assistant views. Access uses only a demo flag. Task records are versioned and validated before loading. Unavailable storage falls back to current-visit state.

## Required checks

- Production build, lint and Vitest behavioral tests.
- Browser interactions: create/edit/complete/delete/reload, pricing, resource filtering, contact validation, login/logout.
- Keyboard: modal focus containment and return, Escape, mobile navigation, visible focus.
- 375, 768, 1024 and 1440px viewport overflow checks.
- Automated accessibility scan and dependency audit.
- Public deployment and direct deep-link checks after publishing.

## Current status

- Final production build passed: main JavaScript approximately 99.81 kB gzip, separate dashboard 6.26 kB gzip, stylesheet 13.89 kB gzip. Fonts use local Latin subsets.
- Final ESLint check passed, including Node `.mjs` verification/publication helpers.
- Vitest 5.0.5: **10 tests passed**. Covers billing math, corrupt/blocked storage, unique article slugs, combined filters, form validation, credential-free entry, complete task CRUD and logout, and missing articles.
- Browser acceptance: **11 routes, 24 responsive checks, 6 interaction groups passed**, with **zero runtime errors**. Full evidence: `docs/browser-report.json`.
- axe WCAG A/AA and 2.1 AA: **zero violations** on desktop home/pricing/features and mobile dashboard after fixing muted text contrast.
- Expanded axe scan: **zero violations across 14 additional checks**, covering resources, article, walkthrough, about, contact, login, signup, 404, all five desktop workspace views and the open task editor. Evidence: `docs/accessibility-report.json`.
- Keyboard checks passed for marketing mobile menu Escape/focus return, modal Escape/focus return and dashboard mobile sidebar navigation.
- Dependency installation after updating Vitest and Sharp reported **zero vulnerabilities**. These are development tools; the application makes no AI or backend calls.
- Actual desktop/mobile homepage, desktop/mobile dashboard, pricing and features screenshots exist in `docs/screenshots/`.
- Inspected the 1600×900 desktop-and-phone cover, PNG and WebP. It uses real captured screenshot pixels with original SVG device frames and preserves UI proportions.

## Publication and portfolio

- Public source: https://github.com/awaljanhematyar/flowpilot-ai. Initial remote commit matched the local commit; no force push or history rewrite.
- Verified public Vercel homepage: https://flowpilot-ai-sigma.vercel.app (HTTP 200 and rendered UI).
- The full browser acceptance suite also passed against production: 11 routes, 24 responsive checks, six flow groups, zero runtime errors and zero reported accessibility violations. `docs/browser-report.json` records the production origin; `docs/local-browser-report.json` retains local evidence.
- Portfolio project saved through its established admin workflow, with the actual PNG uploaded. The existing three projects remain; the admin confirms four total.
- Public portfolio detail: https://hematyar-professional-portfolio.vercel.app/projects/flowpilot-ai. Cover loaded at 1600×900; source and live links respond HTTP 200; homepage project card exists. Desktop 1440px and mobile 375px checks passed with no horizontal overflow. Evidence: `docs/portfolio/verification.json` and `docs/screenshots/portfolio-project-*.png`.
- Search assets contain 13 public URLs; demo routes are excluded from indexing. Per-route metadata is updated client-side, so crawlers without JavaScript may see base-page metadata.

No external access blocker remains. Browser checks use Microsoft Edge/Chromium; Safari, Firefox and a full screen-reader audit are not covered. There is no production backend, live AI, real authentication, billing or team synchronization by design.
