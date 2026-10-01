#!/usr/bin/env node

import { statSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const isStrict =
  process.argv.includes("--strict") ||
  process.env.CI === "true" ||
  process.env.NODE_ENV === "production";

// Only verify media that belongs to the current DIGITALE MEDIA experience.
// Optional assets can be added here when they are actually referenced by the site.
const ASSET_BUDGETS = [];

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
