import { randomInt } from "node:crypto";

export function generateDiagnosticId(prefix = "DGT"): string {
  const code = randomInt(1000, 10000);
  return `${prefix}-${code}`;
}
