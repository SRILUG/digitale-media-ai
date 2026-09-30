#!/usr/bin/env node

import { statSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const isStrict =
  process.argv.includes("--strict") ||
  process.env.CI === "true" ||
  process.env.NODE_ENV === "production";

const ASSET_BUDGETS = [
  { path: "public/media/hero/showreel.webm", maxBytes: 4 * 1024 * 1024, label: "Hero Video (WebM)" },
  { path: "public/media/hero/showreel.mp4", maxBytes: 4 * 1024 * 1024, label: "Hero Video (MP4)" },
  { path: "public/media/hero/showreel-poster.webp", maxBytes: 120 * 1024, label: "Hero Poster" },
  { path: "public/media/work/urbanrise.webp", maxBytes: 350 * 1024, label: "Urbanrise Editorial" },
  { path: "public/media/cases/urbanrise-hero.avif", maxBytes: 250 * 1024, label: "Urbanrise Case Hero" },
];

let hasErrors = false;

for (const asset of ASSET_BUDGETS) {
  const fullPath = resolve(process.cwd(), asset.path);

  if (!existsSync(fullPath)) {
    if (isStrict) {
      console.error(`[VERIFY:FAIL] Missing required production asset: ${asset.path}`);
      hasErrors = true;
    } else {
      console.warn(`[VERIFY:WARN] Asset not present (dev mode): ${asset.path}`);
    }
    continue;
  }

  const { size } = statSync(fullPath);
  if (size > asset.maxBytes) {
    console.error(
      `[VERIFY:FAIL] Oversized asset ${asset.path}: ${(size / 1024).toFixed(1)} KB exceeds ${(asset.maxBytes / 1024).toFixed(0)} KB`
    );
    hasErrors = true;
  } else {
    console.log(`[VERIFY:PASS] ${asset.label}: ${(size / 1024).toFixed(1)} KB`);
  }
}

if (hasErrors) process.exit(1);
