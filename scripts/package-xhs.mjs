import { execFileSync } from "node:child_process";
import {
  access,
  readFile,
  readdir,
  rm,
  stat,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const buildDirectory = path.join(repositoryRoot, "dist", "xhs");
const archivePath = path.join(repositoryRoot, "dist", "sticker-forge-xhs.zip");
const maximumArchiveBytes = 10 * 1024 * 1024;
const recommendedArchiveBytes = 2 * 1024 * 1024;
const allowedExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".woff",
  ".woff2",
  ".json",
]);

async function listFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(
        ...(await listFiles(path.join(directory, entry.name), relativePath)),
      );
    } else {
      files.push(relativePath);
    }
  }
  return files.sort();
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertNoMatch(source, pattern, message) {
  assert(!pattern.test(source), message);
}

function localResourcePaths(html) {
  return [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter(
      (value) =>
        !value.startsWith("data:")
        && !value.startsWith("blob:")
        && !value.startsWith("#"),
    );
}

async function validateBuild() {
  const files = await listFiles(buildDirectory);
  assert(files.includes("index.html"), "index.html must be at the package root.");
  assert(
    files.filter((file) => file.endsWith(".html")).length === 1,
    "The XHS package must contain exactly one HTML file.",
  );

  for (const file of files) {
    const extension = path.extname(file).toLowerCase();
    assert(allowedExtensions.has(extension), `Unsupported package file: ${file}`);
    assert(!file.endsWith(".map"), `Source maps are forbidden: ${file}`);
    assert(
      !/(^|\/)(?:node_modules|\.git|\.DS_Store)(?:\/|$)/.test(file),
      `Development-only package entry: ${file}`,
    );
  }

  const html = await readFile(path.join(buildDirectory, "index.html"), "utf8");
  assert(/^<!DOCTYPE html>/i.test(html), "index.html is missing its doctype.");
  assert(
    /<html\s+lang="zh-CN"/i.test(html),
    'index.html must declare lang="zh-CN".',
  );
  assert(
    /<meta\s+charset="UTF-8"/i.test(html),
    "index.html must declare UTF-8.",
  );
  for (const token of [
    "width=device-width",
    "initial-scale=1.0",
    "viewport-fit=cover",
  ]) {
    assert(html.includes(token), `Viewport is missing ${token}.`);
  }
  assertNoMatch(
    html,
    /<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/i,
    "Inline scripts are forbidden.",
  );
  assertNoMatch(html, /\son[a-z]+\s*=/i, "Inline event handlers are forbidden.");
  assertNoMatch(
    html,
    /<base\b|<iframe\b|<object\b|http(?:s)?:\/\//i,
    "index.html contains a forbidden element or external URL.",
  );
  assertNoMatch(
    html,
    /http-equiv=["']Content-Security-Policy/i,
    "The container owns the CSP; remove the page CSP.",
  );

  const resources = localResourcePaths(html);
  for (const resource of resources) {
    assert(
      resource.startsWith("./"),
      `Resource paths must be relative: ${resource}`,
    );
    const decoded = decodeURIComponent(resource.slice(2).split(/[?#]/, 1)[0]);
    await access(path.join(buildDirectory, decoded));
  }

  const textFiles = files.filter((file) => /\.(?:html|css|js)$/i.test(file));
  const combined = (
    await Promise.all(
      textFiles.map((file) => readFile(path.join(buildDirectory, file), "utf8")),
    )
  ).join("\n");
  const forbiddenPatterns = [
    [/\bfetch\s*\(/, "fetch"],
    [/\bXMLHttpRequest\b/, "XMLHttpRequest"],
    [/\bnew\s+(?:Shared)?Worker\s*\(/, "Worker"],
    [/\bnavigator\.serviceWorker\b/, "Service Worker"],
    [/\bWebAssembly(?:\.|\b)/, "WebAssembly"],
    [/\bnavigator\.clipboard\b/, "clipboard"],
    [/\bnavigator\.geolocation\b/, "geolocation"],
    [/\bnavigator\.(?:bluetooth|usb|hid|serial)\b/, "hardware connection"],
    [/\bnew\s+(?:WebSocket|EventSource|RTCPeerConnection)\s*\(/, "networking"],
    [/\b(?:eval|Function)\s*\(/, "dynamic code execution"],
    [/\bwindow\.(?:open|prompt)\s*\(/, "window API"],
    [
      /\b(?:location\.href\s*=(?!=)|location\.assign\s*\()/,
      "external navigation",
    ],
    [/\.download\s*=/, "file download"],
    [/target=["']_blank/i, "external window"],
    [/<iframe\b|<object\b/i, "embedded document"],
    [/vibeloft\.ai|github\.com\/CatsJuice/i, "external application URL"],
  ];
  for (const [pattern, label] of forbiddenPatterns) {
    assertNoMatch(combined, pattern, `Forbidden ${label} code remains.`);
  }

  const javascriptFiles = files.filter((file) => file.endsWith(".js"));
  for (const file of javascriptFiles) {
    execFileSync(process.execPath, ["--check", path.join(buildDirectory, file)], {
      stdio: "pipe",
    });
  }

  return { files, resources };
}

async function createAndValidateArchive() {
  await rm(archivePath, { force: true });
  execFileSync(
    "zip",
    ["-r", "-X", "../sticker-forge-xhs.zip", ".", "-x", "*.DS_Store"],
    {
      cwd: buildDirectory,
      stdio: "pipe",
    },
  );
  execFileSync("unzip", ["-t", archivePath], { stdio: "pipe" });
  const entries = execFileSync("unzip", ["-Z1", archivePath], {
    encoding: "utf8",
  })
    .trim()
    .split("\n");
  assert(entries.includes("index.html"), "ZIP root is missing index.html.");
  assert(
    !entries.some((entry) => /^xhs\//.test(entry)),
    "ZIP incorrectly contains an extra top-level directory.",
  );
  const archive = await stat(archivePath);
  assert(
    archive.size <= maximumArchiveBytes,
    `ZIP is ${(archive.size / 1024 / 1024).toFixed(2)} MB; the limit is 10 MB.`,
  );
  return archive.size;
}

const { files, resources } = await validateBuild();
const archiveBytes = await createAndValidateArchive();
const sizeLabel = `${(archiveBytes / 1024).toFixed(1)} KB`;
const recommendation =
  archiveBytes <= recommendedArchiveBytes ? "within 2 MB recommendation" : "over 2 MB recommendation";

console.log("XHS validation: PASS");
console.log(`Files: ${files.length}`);
console.log(`HTML resources: ${resources.length}`);
console.log(`Forbidden capability scan: PASS`);
console.log(`Archive: ${archivePath}`);
console.log(`Archive size: ${sizeLabel} (${recommendation})`);
