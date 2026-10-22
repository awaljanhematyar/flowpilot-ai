// Broader accessibility checks cover every marketing route and each workspace view.
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:5173";
const report = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const route of [
    "/resources",
    "/resources/a-calmer-week",
    "/how-it-works",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/not-found",
  ]) {
    await page.goto(base + route);
    await page.locator("h1").waitFor();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    report.push({
      route,
      violations: result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
  await page.goto(base + "/login");
  await page.getByRole("button", { name: "Enter demo workspace" }).click();
  for (const view of [
    "overview",
    "tasks",
    "projects",
    "insights",
    "assistant",
  ]) {
    await page.goto(`${base}/dashboard?view=${view}`);
    await page.locator("h1").waitFor();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    report.push({
      route: `/dashboard?view=${view}`,
      violations: result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
  await page.getByRole("button", { name: "New task" }).click();
  const dialog = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  report.push({
    route: "Task editor dialog",
    violations: dialog.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  });
} finally {
  await writeFile(
    "docs/accessibility-report.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
console.log(
  JSON.stringify(
    report.map((r) => ({ route: r.route, violations: r.violations.length })),
    null,
    2,
  ),
);
assert.equal(
  report.reduce((n, r) => n + r.violations.length, 0),
  0,
);
