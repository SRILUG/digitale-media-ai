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

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full);
  }
}
walk(mediaRoot);

function limitFor(file) {
  const relative = path.relative(mediaRoot, file).replaceAll("\\", "/");
  const lower = relative.toLowerCase();
  const ext = path.extname(lower);

  if (ext === ".mp4" || ext === ".webm") {
    return { max: manifest.rules.hero.video.maxBytes, label: "hero video" };
  }

  if (lower === "hero/showreel-poster.webp") {
    return { max: manifest.rules.hero.poster.maxBytes, label: "hero poster" };
  }

  if (lower.startsWith("hero/")) {
    return lower.includes("mobile")
      ? { max: manifest.rules.hero.mobile.maxBytes, label: "hero mobile" }
      : { max: manifest.rules.hero.desktop.maxBytes, label: "hero desktop" };
  }

  if (lower.startsWith("work/")) {
    return lower.includes("mobile")
      ? { max: manifest.rules.editorialWork.mobile.maxBytes, label: "editorial mobile" }
      : { max: manifest.rules.editorialWork.desktop.maxBytes, label: "editorial desktop" };
  }

  if (lower.startsWith("cases/")) {
    return lower.includes("detail")
      ? { max: manifest.rules.caseStudy.detail.maxBytes, label: "case detail" }
      : { max: manifest.rules.caseStudy.hero.maxBytes, label: "case hero" };
  }

  if (lower.startsWith("experiences/")) {
    return lower.includes("mobile")
      ? { max: manifest.rules.experiences.mobile.maxBytes, label: "experience mobile" }
      : { max: manifest.rules.experiences.desktop.maxBytes, label: "experience desktop" };
  }

  return null;
}

const violations = [];
for (const file of files) {
  const rule = limitFor(file);
  if (!rule) continue;
  const bytes = fs.statSync(file).size;
  if (bytes > rule.max) {
    violations.push(
      `${path.relative(root, file)}: ${bytes} bytes > ${rule.max} bytes (${rule.label})`
    );
  }
}

if (violations.length) {
  console.error("MEDIA GATE FAILED");
  violations.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`MEDIA GATE PASSED: ${files.length} file(s) scanned.`);
