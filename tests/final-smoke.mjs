// Verify every article deep link, final production assets, SEO files and demo indexing headers.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { articles } from "../src/data/content.js";
import { chromium } from "@playwright/test";
const origin = "https://flowpilot-ai-sigma.vercel.app";
const paths = [
  "/",
  "/features",
  "/how-it-works",
  "/pricing",
  "/resources",
  "/about",
  "/contact",
  "/login",
  "/signup",
  "/dashboard",
  ...articles.map((a) => `/resources/${a.slug}`),
];
const report = { origin, pages: [] };
for (const path of paths) {
  const response = await fetch(origin + path);
  const html = await response.text();
  assert.equal(response.status, 200, path);
  assert(html.includes('<div id="root"></div>'), path);
  if (["/login", "/signup", "/dashboard"].includes(path))
    assert(response.headers.get("x-robots-tag")?.includes("noindex"));
  report.pages.push({ path, status: response.status });
}
const robots = await fetch(origin + "/robots.txt");
assert.equal(robots.status, 200);
assert((await robots.text()).includes(`${origin}/sitemap.xml`));
const sitemap = await fetch(origin + "/sitemap.xml");
assert.equal(sitemap.status, 200);
assert.equal((await sitemap.text()).match(/<url>/g)?.length, 13);
const cover = await fetch(origin + "/social-cover.png");
assert.equal(cover.status, 200);
assert(cover.headers.get("content-type")?.includes("image"));
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const article of articles) {
    await page.goto(`${origin}/resources/${article.slug}`);
    await page
      .getByRole("heading", { name: article.title, exact: true, level: 1 })
      .waitFor();
  }
  report.renderedArticleDeepLinks = articles.length;
} finally {
  await browser.close();
}
await mkdir("test-results", { recursive: true });
await writeFile(
  "test-results/final-smoke.json",
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify({
    pages: report.pages.length,
    robots: 200,
    sitemap: 200,
    sitemapUrls: 13,
    socialCover: 200,
    demoNoindex: true,
    renderedArticleDeepLinks: report.renderedArticleDeepLinks,
  }),
);
