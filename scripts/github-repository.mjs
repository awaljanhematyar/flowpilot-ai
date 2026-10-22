// Create only the explicitly requested empty repository using existing Git authentication.
// Credentials remain in process memory and are never written, logged, or added to remote URLs.
import { spawnSync } from "node:child_process";
const owner = "awaljanhematyar";
const name = "flowpilot-ai";
let token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!token) {
  const result = spawnSync("git", ["credential", "fill"], {
    input: "protocol=https\nhost=github.com\n\n",
    encoding: "utf8",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GCM_INTERACTIVE: "Never" },
  });
  if (result.status !== 0)
    throw new Error(
      "No existing GitHub credential is available. Sign in through Git Credential Manager.",
    );
  token = result.stdout
    .split(/\r?\n/)
    .find((line) => line.startsWith("password="))
    ?.slice(9);
}
if (!token) throw new Error("No authenticated GitHub token available.");
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "Content-Type": "application/json",
};
const user = await fetch("https://api.github.com/user", { headers }).then((r) =>
  r.json(),
);
if (user.login !== owner)
  throw new Error("Authenticated account does not match the requested owner.");
const existing = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
  headers,
});
if (existing.status === 404) {
  const result = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      description:
        "A thoughtfully designed React 19 SaaS portfolio demo with an interactive local productivity dashboard.",
      private: false,
      auto_init: false,
    }),
  });
  if (!result.ok)
    throw new Error(`Repository creation failed: HTTP ${result.status}`);
  const repo = await result.json();
  console.log(
    JSON.stringify({
      url: repo.html_url,
      created: true,
      visibility: repo.visibility,
    }),
  );
} else {
  if (!existing.ok)
    throw new Error(`Repository inspection failed: HTTP ${existing.status}`);
  const repo = await existing.json();
  const contents = await fetch(
    `https://api.github.com/repos/${owner}/${name}/contents`,
    { headers },
  );
  console.log(
    JSON.stringify({
      url: repo.html_url,
      created: false,
      visibility: repo.visibility,
      contentsStatus: contents.status,
    }),
  );
  if (contents.ok)
    throw new Error(
      "The existing repository has contents. Inspect its history before pushing.",
    );
}
