# Portfolio integration

FlowPilot AI was added through the existing, authenticated Supabase-backed portfolio admin. A separate new record was created; all three previous projects remain intact. The admin reported “Changes saved successfully” and displayed four projects.

- Public project: https://hematyar-professional-portfolio.vercel.app/projects/flowpilot-ai
- Production demo: https://flowpilot-ai-sigma.vercel.app
- Source: https://github.com/awaljanhematyar/flowpilot-ai
- Cover: the actual 1600×900 PNG was uploaded through the admin's file chooser to its existing public image bucket.

The public detail page renders the exact requested title, category, short/detailed descriptions, six technologies, live link and source link. Its cover was verified loaded with natural dimensions 1600×900. The record metadata is archived in `project-entry.json`; it includes artifact-only fields and is not intended as a raw database insert.

Successful responsive screenshots and link checks are recorded in `verification.json`. No access blocker remains.
