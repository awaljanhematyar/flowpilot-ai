// Verify the saved public portfolio record, uploaded cover, outgoing links and responsive layout.
import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const url =
  "https://hematyar-professional-portfolio.vercel.app/projects/flowpilot-ai";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const report = { url, viewports: [] };
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(url);
  await page
    .getByRole("heading", {
      name: "FlowPilot AI — Premium AI SaaS Dashboard",
      exact: true,
    })
    .waitFor();
  const image = page.getByRole("img", {
    name: "FlowPilot AI — Premium AI SaaS Dashboard preview",
    exact: true,
  });
  await image.evaluate((el) => el.decode());
  report.image = await image.evaluate((el) => ({
    loaded: el.complete && el.naturalWidth > 0,
    width: el.naturalWidth,
    height: el.naturalHeight,
    src: el.currentSrc,
  }));
  assert.equal(report.image.width, 1600);
  assert.equal(report.image.height, 900);
  report.live = await page
    .getByRole("link", { name: "View live project", exact: true })
    .getAttribute("href");
  report.github = await page
    .getByRole("link", { name: "Source code", exact: true })
    .getAttribute("href");
  assert.equal(report.live, "https://flowpilot-ai-sigma.vercel.app");
  assert.equal(
    report.github,
    "https://github.com/awaljanhematyar/flowpilot-ai",
  );
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      offenders: [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return (
            r.width > 0 &&
            (r.right > document.documentElement.clientWidth + 1 || r.left < -1)
          );
        })
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          text: el.textContent?.slice(0, 50),
        }))
        .slice(0, 8),
    }));
    report.viewports.push({ width, ...dimensions });
    await page.screenshot({
      path: `docs/screenshots/portfolio-project-${width === 375 ? "mobile" : "desktop"}.png`,
      fullPage: true,
    });
    assert(
      dimensions.scroll <= dimensions.client + 1,
      `Portfolio overflow at ${width}: ${JSON.stringify(dimensions)}`,
    );
  }
  for (const link of [report.live, report.github]) {
    const response = await context.request.get(link);
    assert.equal(response.status(), 200);
  }
  await page.goto("https://hematyar-professional-portfolio.vercel.app/");
  await page
    .getByRole("link")
    .filter({ hasText: "FlowPilot AI" })
    .first()
    .waitFor();
  report.homepageCard = true;
} finally {
  await writeFile(
    "docs/portfolio/verification.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
