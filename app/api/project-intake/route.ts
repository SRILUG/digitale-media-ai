import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const idempotent = new Map<string, { id: string; expires: number }>();

function clean(value: unknown, max = 5000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const email = clean(payload?.email, 320).toLowerCase();
    const source = clean(payload?.source, 120) || "project-diagnostic";

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    }

    const honeypot = clean(payload?.website_confirm, 200);
    if (honeypot) {
      return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
    }

    const fingerprint = `${source}:${email}`;
    const now = Date.now();
    const existing = idempotent.get(fingerprint);
    if (existing && existing.expires > now) {
      return NextResponse.json({ ok: true, id: existing.id, duplicate: true });
    }

    const id = "DGT-" + Math.floor(1000 + Math.random() * 9000);
    idempotent.set(fingerprint, { id, expires: now + 10 * 60 * 1000 });

    console.log("DIGITALE PROJECT INTAKE", {
      id,
      source,
      email,
      payload: Object.fromEntries(Object.entries(payload || {}).map(([key,value]) => [key, typeof value === "string" ? value.slice(0, 5000) : value]))
    });

    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
