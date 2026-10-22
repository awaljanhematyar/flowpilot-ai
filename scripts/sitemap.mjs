// Generate search-engine assets using the verified production origin and original article slugs.
import { writeFile } from "node:fs/promises";
import { articles } from "../src/data/content.js";
const origin = new URL(
  process.env.SITE_URL || "https://flowpilot-ai-sigma.vercel.app",
).origin;
const routes = [
  "/",
  "/features",
  "/how-it-works",
  "/pricing",
  "/resources",
  "/about",
  "/contact",
  ...articles.map((a) => `/resources/${a.slug}`),
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile("public/sitemap.xml", xml);
await writeFile(
  "public/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /dashboard\nDisallow: /login\nDisallow: /signup\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(`Generated sitemap for ${routes.length} public routes.`);
