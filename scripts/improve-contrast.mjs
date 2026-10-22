// One-time design maintenance: retain hue while making text readable on pale surfaces.
import { readFile, writeFile } from "node:fs/promises";
const path = new URL("../src/index.css", import.meta.url);
const source = await readFile(path, "utf8");
function luminance(rgb) {
  const linear = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
let changes = 0;
const updated = source.replace(
  /(?<![-\w])color:\s*#([a-f\d]{6})(?![a-f\d])/gi,
  (match, hex) => {
    const rgb = [0, 2, 4].map((n) => parseInt(hex.slice(n, n + 2), 16));
    const light = luminance(rgb);
    if (light < 0.12 || light > 0.95) return match;
    let shaded = rgb;
    while (luminance(shaded) > 0.115)
      shaded = shaded.map((v) => Math.floor(v * 0.97));
    changes++;
    return `color: #${shaded.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  },
);
await writeFile(path, updated);
console.log(`Improved ${changes} text color declarations.`);
