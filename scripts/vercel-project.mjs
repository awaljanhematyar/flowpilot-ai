// Inspect or deploy only FlowPilot using the existing Vercel CLI login; never log credentials.
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
const credentialDir = join(
  homedir(),
  "AppData",
  "Roaming",
  "com.vercel.cli",
  "Data",
);
const auth = JSON.parse(
  await readFile(join(credentialDir, "auth.json"), "utf8"),
);
const config = JSON.parse(
  await readFile(join(credentialDir, "config.json"), "utf8"),
);
const token = process.env.VERCEL_TOKEN || auth.token;
if (!token) throw new Error("No existing Vercel token found.");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
async function api(path, options = {}) {
  const r = await fetch(`https://api.vercel.com${path}`, {
    headers,
    ...options,
  });
  const data = await r.json();
  if (!r.ok)
    throw new Error(
      `Vercel HTTP ${r.status}: ${data.error?.code || "request failed"} ${data.error?.message || ""}`,
    );
  return data;
}
const { user } = await api("/v2/user");
const { teams } = await api("/v2/teams");
const team =
  teams.find((t) => t.id === config.currentTeam) ||
  teams.find((t) => t.slug === "awaljanhematyars-projects");
console.log(
  JSON.stringify({
    user: user.username,
    configuredTeam: config.currentTeam,
    selectedTeam: team?.slug,
    teams: teams.map((t) => ({ id: t.id, slug: t.slug })),
  }),
);
if (process.argv.includes("--status")) {
  const saved = JSON.parse(await readFile("docs/deployment.json", "utf8"));
  const status = await api(
    `/v13/deployments/${saved.deploymentId}${saved.teamId ? `?teamId=${saved.teamId}` : ""}`,
  );
  const state = {
    ...saved,
    readyState: status.readyState,
    aliases: status.alias || [],
    error: status.errorMessage || null,
  };
  await writeFile("docs/deployment.json", JSON.stringify(state, null, 2));
  console.log(JSON.stringify(state));
}
if (!process.argv.includes("--deploy")) process.exitCode = 0;
else {
  if (
    user.username !== "awaljanhematyar" &&
    !team?.slug?.startsWith("awaljanhematyar")
  )
    throw new Error("Vercel ownership does not match the requested account.");
  const scope = team ? `?teamId=${encodeURIComponent(team.id)}` : "";
  let project;
  try {
    project = await api(`/v9/projects/flowpilot-ai${scope}`);
  } catch (e) {
    if (!e.message.includes("HTTP 404")) throw e;
  }
  if (!project) {
    project = await api(`/v10/projects${scope}`, {
      method: "POST",
      body: JSON.stringify({
        name: "flowpilot-ai",
        framework: "vite",
        buildCommand: "npm run build",
        outputDirectory: "dist",
        installCommand: "npm ci",
        gitRepository: { type: "github", repo: "awaljanhematyar/flowpilot-ai" },
      }),
    });
  } else if (project.link?.repo && project.link.repo !== "flowpilot-ai")
    throw new Error("Existing project is linked to a different repository.");
  const repo = await fetch(
    "https://api.github.com/repos/awaljanhematyar/flowpilot-ai",
  ).then((r) => r.json());
  if (!repo.id)
    throw new Error(
      "The published public GitHub repository could not be read.",
    );
  const deployment = await api(`/v13/deployments${scope}`, {
    method: "POST",
    body: JSON.stringify({
      name: "flowpilot-ai",
      project: project.id,
      target: "production",
      projectSettings: {
        framework: "vite",
        buildCommand: "npm run build",
        outputDirectory: "dist",
        installCommand: "npm ci",
        nodeVersion: "24.x",
      },
      gitSource: { type: "github", repoId: String(repo.id), ref: "main" },
    }),
  });
  const state = {
    projectId: project.id,
    deploymentId: deployment.id,
    url: `https://${deployment.url}`,
    teamId: team?.id,
    readyState: deployment.readyState,
  };
  await writeFile("docs/deployment.json", JSON.stringify(state, null, 2));
  console.log(JSON.stringify(state));
}
