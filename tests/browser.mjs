// End-to-end acceptance checks and real screenshots against a running app or production URL.
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir("docs/screenshots", { recursive: true });
const report = {
  base,
  routes: [],
  responsive: [],
  accessibility: [],
  flows: [],
};
try {
  // ========================================
  // ROUTES AND RESPONSIVE LAYOUTS
  // ========================================
  for (const route of [
    "/",
    "/features",
    "/how-it-works",
    "/pricing",
    "/resources",
    "/resources/a-calmer-week",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/missing",
  ]) {
    const response = await page.goto(base + route);
    await page.locator("h1,h2").first().waitFor();
    assert.equal(response.status(), 200, route);
    assert(await page.locator("main").count());
    report.routes.push(route);
  }
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/features",
      "/pricing",
      "/resources",
      "/contact",
    ]) {
      await page.goto(base + route);
      await page.locator("h1").waitFor();
      await page.evaluate(() => document.fonts.ready);
      const size = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      assert(
        size.scroll <= size.client + 1,
        `${route} overflows at ${width}: ${JSON.stringify(size)}`,
      );
      report.responsive.push(`${route} @ ${width}`);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const [route, file] of [
    ["/", "desktop-homepage"],
    ["/pricing", "pricing"],
    ["/features", "features"],
  ]) {
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `docs/screenshots/${file}.png`,
      fullPage: true,
    });
    if (route === "/")
      await page.screenshot({
        path: "docs/screenshots/desktop-homepage-viewport.png",
      });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    report.accessibility.push({
      route,
      width: 1440,
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base + "/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "docs/screenshots/mobile-homepage.png",
    fullPage: true,
  });
  await page.screenshot({
    path: "docs/screenshots/mobile-homepage-viewport.png",
  });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  assert(
    await page
      .getByRole("button", { name: "Open navigation" })
      .evaluate((el) => el === document.activeElement),
  );
  report.flows.push("Marketing navigation Escape and focus return");
  // ========================================
  // PRICING, SEARCH, CONTACT AND LOCAL CRUD
  // ========================================
  await page.goto(base + "/pricing");
  await page.getByRole("button", { name: /Yearly/ }).click();
  assert(await page.getByText("$144 USD billed yearly · save 20%").isVisible());
  report.flows.push("Annual pricing: Pro $144/year, Business $278.40/year");
  await page.goto(base + "/resources");
  await page.getByRole("searchbox").fill("not-a-story");
  assert(await page.getByText("No stories found.").isVisible());
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.equal(await page.locator("article").count(), 6);
  report.flows.push("Article search and empty-state recovery");
  await page.goto(base + "/contact");
  await page.getByRole("button", { name: /Try demo submission/ }).click();
  assert(await page.getByText("Please add your name.").isVisible());
  await page.getByLabel(/Your name/).fill("Demo visitor");
  await page.getByLabel(/Email address/).fill("demo@example.com");
  await page
    .getByLabel(/What’s on your mind/)
    .fill("This is a sample message for validation.");
  await page.getByRole("button", { name: /Try demo submission/ }).click();
  assert(await page.getByRole("status").isVisible());
  report.flows.push(
    "Required/email/message validation and honest simulated submission",
  );
  await page.goto(base + "/login");
  await page.getByRole("button", { name: "Enter demo workspace" }).click();
  await page.getByRole("button", { name: "New task" }).waitFor();
  await page.getByRole("button", { name: "New task" }).click();
  await page.getByLabel("Task title").fill("Browser acceptance task");
  await page.getByRole("button", { name: "Create task" }).click();
  await page
    .getByRole("button", { name: "Edit Browser acceptance task" })
    .click();
  await page.getByLabel("Task title").fill("Verified acceptance task");
  await page.getByRole("button", { name: "Save changes" }).click();
  await page
    .getByRole("checkbox", { name: "Mark Verified acceptance task complete" })
    .check();
  await page.reload();
  await page
    .getByRole("checkbox", { name: "Mark Verified acceptance task incomplete" })
    .waitFor();
  await page
    .getByRole("button", { name: "Delete Verified acceptance task" })
    .click();
  await page.getByRole("button", { name: "Delete task", exact: true }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Verified acceptance task", exact: true })
      .count(),
    0,
  );
  report.flows.push("Task create/edit/complete/persist/reload/delete");
  await page.getByRole("button", { name: "New task" }).click();
  await page.keyboard.press("Escape");
  assert(
    await page
      .getByRole("button", { name: "New task" })
      .evaluate((el) => el === document.activeElement),
  );
  await page.getByRole("button", { name: "Open workspace navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "AI assistant", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Weekly planning", exact: true })
    .click();
  assert(
    await page
      .getByText("Predefined demo suggestion — not generated by live AI.", {
        exact: true,
      })
      .isVisible(),
  );
  await page.getByRole("button", { name: "Open workspace navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Overview", exact: true })
    .click();
  await page.screenshot({
    path: "docs/screenshots/mobile-dashboard.png",
    fullPage: true,
  });
  const mobileAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  report.accessibility.push({
    route: "/dashboard",
    width: 375,
    violations: mobileAxe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  });
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const size = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    assert(size.scroll <= size.client + 1, `dashboard overflows ${width}`);
    report.responsive.push(`/dashboard @ ${width}`);
  }
  await page.screenshot({
    path: "docs/screenshots/desktop-dashboard.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Leave demo" }).click();
  await page.getByRole("button", { name: "Enter demo workspace" }).waitFor();
  await page.goto(base + "/dashboard");
  await page.getByRole("button", { name: "Enter demo workspace" }).waitFor();
  report.flows.push(
    "Modal Escape/focus return, mobile sidebar, scenarios, logout/route guard",
  );
  assert.deepEqual(errors, []);
  report.runtimeErrors = errors;
} finally {
  await writeFile("docs/browser-report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(
  JSON.stringify(
    {
      routes: report.routes.length,
      responsive: report.responsive.length,
      flows: report.flows,
      accessibility: report.accessibility.map((a) => ({
        route: a.route,
        width: a.width,
        violations: a.violations.length,
      })),
      runtimeErrors: errors,
    },
    null,
    2,
  ),
);
assert.equal(report.accessibility.reduce((total, check) => total + check.violations.length, 0), 0, 'Accessibility violations must be resolved; see docs/browser-report.json.');
