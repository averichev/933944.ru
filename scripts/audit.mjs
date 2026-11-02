import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";

const mode = process.argv[2] ?? "mobile";
if (!["mobile", "desktop"].includes(mode)) throw new Error("Use mobile or desktop.");
// Overrides also allow comparing a saved build with the current one.
const directory = resolve(process.env.AUDIT_DIR ?? "dist");
const output = resolve(process.env.AUDIT_OUTPUT ?? `outputs/lighthouse-${mode}`);
await readFile(resolve(directory, "index.html")); // Fail before launching Chrome if no build exists.
await mkdir(dirname(output), { recursive: true });
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".avif": "image/avif", ".webp": "image/webp",
  ".png": "image/png", ".jpg": "image/jpeg", ".ttf": "font/ttf", ".woff2": "font/woff2",
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const file = resolve(directory, `.${pathname.endsWith("/") ? pathname + "index.html" : pathname}`);
    if (!file.startsWith(directory + sep)) {
      response.writeHead(403).end();
      return;
    }
    const body = await readFile(file);
    // Deliberately no compression or cache policy: those belong to the deployment server.
    response.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream", "Content-Length": body.length });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404).end();
  }
});

try {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  const args = [
    `http://127.0.0.1:${port}/`, "--chrome-flags=--headless",
    "--output=html", "--output=json", `--output-path=${output}`, "--quiet",
    ...(mode === "desktop" ? ["--preset=desktop"] : []),
  ];
  const child = spawn("lighthouse", args, { stdio: "inherit" });
  process.exitCode = await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
  if (process.exitCode === 0) {
    const report = JSON.parse(await readFile(`${output}.report.json`, "utf8"));
    console.log(Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)])));
    console.log(`Report: ${output}.report.html`);
  }
} finally {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
