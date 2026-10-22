// Vite, React, Tailwind and isolated browser-like unit test configuration.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    testTimeout: 60000,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    exclude: ["node_modules/**", "tests/**"],
  },
});
