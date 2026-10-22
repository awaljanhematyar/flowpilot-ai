// Compose real homepage captures into an original 1600×900 device mockup without redrawing UI.
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
await mkdir("docs/portfolio", { recursive: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1200 },
    reducedMotion: "reduce",
  });
  await page.goto(process.env.TEST_BASE_URL || "http://127.0.0.1:5173");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "docs/screenshots/desktop-cover-source.png" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "docs/screenshots/mobile-homepage-viewport.png",
  });
  await page.screenshot({
    path: "docs/screenshots/mobile-homepage.png",
    fullPage: true,
  });
} finally {
  await browser.close();
}
// ========================================
// ORIGINAL DEVICE FRAMES AND REAL SCREEN PIXELS
// ========================================
const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><radialGradient id="bg"><stop stop-color="#fbfaff"/><stop offset="1" stop-color="#e9e4f3"/></radialGradient><linearGradient id="metal" x1="0" x2="1"><stop stop-color="#c9cbd5"/><stop offset=".5" stop-color="#f3f3f8"/><stop offset="1" stop-color="#b7bac7"/></linearGradient><filter id="shadow" x="-50%" y="-50%" width="200%" height="220%"><feGaussianBlur stdDeviation="20"/></filter><linearGradient id="black" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#44424e"/><stop offset=".5" stop-color="#161721"/><stop offset="1" stop-color="#3d3d49"/></linearGradient></defs><rect width="1600" height="900" fill="url(#bg)"/><circle cx="1450" cy="100" r="430" fill="none" stroke="#d9d1e7"/><circle cx="1450" cy="100" r="350" fill="none" stroke="#ded7eb"/><circle cx="-50" cy="800" r="360" fill="#ded6ef" opacity=".35"/><ellipse cx="689" cy="836" rx="550" ry="24" fill="#534668" opacity=".17" filter="url(#shadow)"/><ellipse cx="1230" cy="824" rx="170" ry="18" fill="#534668" opacity=".2" filter="url(#shadow)"/><text x="100" y="55" font-family="Arial,sans-serif" font-size="16" font-weight="700" letter-spacing="4" fill="#54466d">FLOWPILOT AI</text><text x="1500" y="55" text-anchor="end" font-family="Arial,sans-serif" font-size="11" letter-spacing="3" fill="#7f718f">PRODUCT DESIGN · REACT DEVELOPMENT</text><path d="M550 755h110l25 75H525z" fill="url(#metal)"/><rect x="443" y="829" width="325" height="12" rx="6" fill="url(#metal)"/><rect x="83" y="98" width="1058" height="684" rx="24" fill="url(#black)" stroke="#9a96a8" stroke-width="1.5"/><rect x="95" y="110" width="1034" height="654" rx="10" fill="#0d111b"/><circle cx="612" cy="105" r="2" fill="#a1a0af"/><rect x="1094" y="242" width="269" height="565" rx="40" fill="#514c5c" stroke="#bdb7c7" stroke-width="2"/><rect x="1098" y="246" width="261" height="557" rx="37" fill="#17151f"/><rect x="1091" y="348" width="3" height="43" rx="1.5" fill="#665e70"/><rect x="1091" y="403" width="3" height="60" rx="1.5" fill="#665e70"/><rect x="1363" y="382" width="3" height="75" rx="1.5" fill="#665e70"/><text x="100" y="885" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="#7c6e8e">WORK SMARTER. MOVE FASTER.</text><text x="1500" y="885" text-anchor="end" font-family="Arial,sans-serif" font-size="10" letter-spacing="2" fill="#8b7e9c">RESPONSIVE SAAS PORTFOLIO DEMO</text></svg>`,
);
const desktop = await sharp("docs/screenshots/desktop-cover-source.png")
  .resize(1024, 640)
  .png()
  .toBuffer();
const mobile = await sharp("docs/screenshots/mobile-homepage-viewport.png")
  .resize(243, 526)
  .composite([
    {
      input: Buffer.from(
        '<svg width="243" height="526"><rect width="243" height="526" rx="29" fill="white"/></svg>',
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();
const details = Buffer.from(
  '<svg width="1600" height="900"><circle cx="1230" cy="250" r="2" fill="#393545"/><rect x="1185" y="790" width="90" height="4" rx="2" fill="#78717f"/></svg>',
);
const output = await sharp(svg)
  .composite([
    { input: desktop, left: 100, top: 118 },
    { input: mobile, left: 1107, top: 255 },
    { input: details },
  ])
  .png()
  .toBuffer();
await writeFile("docs/portfolio/flowpilot-ai-cover.png", output);
await sharp(output)
  .webp({ quality: 88 })
  .toFile("docs/portfolio/flowpilot-ai-cover.webp");
await sharp(output).resize(1200, 675).png().toFile("public/social-cover.png");
console.log(
  "Created 1600×900 PNG and WebP portfolio covers from actual browser screenshots.",
);
