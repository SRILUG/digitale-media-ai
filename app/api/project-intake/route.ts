import { NextResponse, type NextRequest } from "next/server";
import { generateDiagnosticId } from "@/lib/id";
import { RawIntakeSchema, normalizeIntake } from "@/lib/intake-schema";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);

    if (!json) {
      return NextResponse.json(
        { ok: false, error: "Malformed JSON payload" },
        { status: 400 },
      );
    }

    const parseResult = RawIntakeSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Bots that populate the hidden honeypot are acknowledged without
    // creating a real lead or revealing that the submission was discarded.
    if (parseResult.data.bot_field) {
      return NextResponse.json(
        { ok: true, id: "DGT-HONEYPOT" },
        { status: 200 },
      );
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim() || null
      : req.headers.get("x-real-ip") ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;

    const submissionId = generateDiagnosticId();
    const record = normalizeIntake(submissionId, parseResult.data, {
      ip,
      userAgent,
    });

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      const { createClient } = await import("@supabase/supabase-js");

      const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });

      const { error: dbError } = await supabase
        .from("project_intakes")
        .insert([record]);

      if (dbError) {
        console.error("[DATABASE_INSERT_ERROR]", {
          id: submissionId,
          code: dbError.code,
          message: dbError.message,
        });

        return NextResponse.json(
          { ok: false, error: "Persistence failed" },
          { status: 500 },
        );
      }
    } else {
      console.log(
        `[INTAKE:RECORD_PREPARED] ID: ${submissionId} (Awaiting DB Credentials)`,
      );
      console.log(JSON.stringify(record, null, 2));
    }

    return NextResponse.json(
      {
        ok: true,
        id: submissionId,
        message: "Brief received. Routing to practice lead.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[UNCAUGHT_INTAKE_ERROR]", error);

    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
