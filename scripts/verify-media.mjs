#!/usr/bin/env node

import { statSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ASSET_BUDGETS = [
  { path: "public/media/brand/digitale-media-logo.webp", label: "Brand logo", maxBytes: 100_000 },
  { path: "public/media/brand/digitale-media-logo-og.png", label: "Open Graph logo export", maxBytes: 100_000 },
  { path: "public/media/founders/siva-veerapaneni.webp", label: "Siva Veerapaneni portrait", maxBytes: 450_000 },
  { path: "public/media/founders/uma-saravana-kumar.webp", label: "Uma Saravana Kumar portrait", maxBytes: 450_000 },
];

let hasErrors = false;

for (const asset of ASSET_BUDGETS) {
  const fullPath = resolve(process.cwd(), asset.path);

  if (!existsSync(fullPath)) {
    console.error(`[VERIFY:FAIL] Missing required site asset: ${asset.path}`);
    hasErrors = true;
    continue;
  }

  const file = statSync(fullPath);
  if (!file.isFile()) {
    console.error(`[VERIFY:FAIL] Required media path is not a file: ${asset.path}`);
    hasErrors = true;
    continue;
  }

  const { size } = file;
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
