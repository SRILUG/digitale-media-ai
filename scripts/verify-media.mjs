#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "docs", "asset-manifest.json"), "utf8")
);
const mediaRoot = path.join(root, "public", "media");

if (!fs.existsSync(mediaRoot)) {
  console.log("MEDIA GATE: no public/media directory yet; no assets to verify.");
  process.exit(0);
}

const rules = [
  { test: /\.(mp4|webm)$/i, max: manifest.rules.hero.video.maxBytes, label: "hero video" },
  { test: /\.webp$/i, max: manifest.rules.hero.desktop.maxBytes, label: "WebP" },
  { test: /\.avif$/i, max: manifest.rules.editorialWork.desktop.maxBytes, label: "AVIF" },
  { test: /showreel-poster\.webp$/i, max: manifest.rules.hero.poster.maxBytes, label: "hero poster" },
];

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full);
  }
}
walk(mediaRoot);

const violations = [];
for (const file of files) {
  const rule = rules.find((candidate) => candidate.test.test(file));
  if (!rule) continue;
  const bytes = fs.statSync(file).size;
  if (bytes > rule.max) {
    violations.push(`${path.relative(root, file)}: ${bytes} bytes > ${rule.max} bytes (${rule.label})`);
  }
}

if (violations.length) {
  console.error("MEDIA GATE FAILED");
  violations.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`MEDIA GATE PASSED: ${files.length} file(s) scanned.`);
