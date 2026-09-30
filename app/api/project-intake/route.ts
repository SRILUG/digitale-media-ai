import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const id = "DGT-" + Math.floor(1000 + Math.random() * 9000);
  console.log("DIGITALE PROJECT INTAKE", { id, payload });
  return NextResponse.json({ ok: true, id });
}
