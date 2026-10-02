import { NextResponse, type NextRequest } from "next/server";
import { generateDiagnosticId } from "@/lib/id";
import { RawIntakeSchema, normalizeIntake } from "@/lib/intake-schema";
import { dispatchLeadNotification } from "@/lib/notifications";

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

    // Persistence is the source of truth. Never return a success response
    // unless a real database insert has been attempted successfully.
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error(
        "[DATABASE_CONFIG_ERROR] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required",
      );

      return NextResponse.json(
        { ok: false, error: "Intake persistence is not configured" },
        { status: 503 },
      );
    }

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

    // Notification is deliberately after persistence. Slack failures are
    // isolated inside the dispatcher and can never turn a stored lead into
    // a failed client submission.
    const slackWebhookUrl =
      process.env.SLACK_WEBHOOK_URL || process.env.INTERNAL_SLACK_WEBHOOK_URL;
    const supabaseProjectId = process.env.SUPABASE_PROJECT_ID;

    if (slackWebhookUrl) {
      await dispatchLeadNotification(
        record,
        slackWebhookUrl,
        supabaseProjectId,
      );
    } else {
      console.log(
        `[NOTIFICATION:SKIPPED] Brief ${submissionId} — Slack webhook not configured`,
      );
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
