import type { NormalizedIntakeRecord } from "./intake-schema";

export async function dispatchLeadNotification(
  record: NormalizedIntakeRecord,
  webhookUrl: string,
  supabaseProjectId?: string,
): Promise<boolean> {
  const cleanPhone = record.contact_phone
    ? record.contact_phone.replace(/[^0-9]/g, "")
    : null;
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

  const studioUrl = supabaseProjectId
    ? `https://supabase.com/dashboard/project/${supabaseProjectId}/editor/project_intakes`
    : null;

  const practiceDisplay = record.practice_focus
    ? `${record.practice.toUpperCase()} (${record.practice_focus})`
    : record.practice.toUpperCase();

  const blocks: Record<string, unknown>[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `🚨 NEW DIAGNOSTIC BRIEF // ${record.id}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Client:*\n${record.business_name}` },
        { type: "mrkdwn", text: `*Practice:*\n${practiceDisplay}` },
        { type: "mrkdwn", text: `*Scale:*\n${record.currency} ${record.budget_range}` },
        { type: "mrkdwn", text: `*Timeline:*\n${record.timeline}` },
        { type: "mrkdwn", text: `*Geography:*\n${record.geography || "Not specified"}` },
        {
          type: "mrkdwn",
          text: `*Contact:*\n${record.contact_name}${record.contact_role ? ` (${record.contact_role})` : ""}`,
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Email:*\n<mailto:${record.contact_email}|${record.contact_email}>`,
        },
        {
          type: "mrkdwn",
          text: `*Phone:*\n${record.contact_phone || "None provided"}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Target Outcome:*\n> _${record.strategic_outcome.replace(/\n/g, " ")}_`,
      },
    },
  ];

  const actionElements: Record<string, unknown>[] = [];

  if (waLink) {
    actionElements.push({
      type: "button",
      text: { type: "plain_text", text: "WhatsApp Client" },
      url: waLink,
    });
  }

  if (studioUrl) {
    actionElements.push({
      type: "button",
      text: { type: "plain_text", text: "Open in Supabase" },
      url: studioUrl,
      style: "primary",
    });
  }

  if (actionElements.length > 0) {
    blocks.push({
      type: "actions",
      elements: actionElements,
    });
  }

  const payload = {
    text: `🚨 New Brief: ${record.id} — ${record.business_name} (${record.practice})`,
    blocks,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(
        `[NOTIFICATION:FAIL] Webhook returned status ${response.status}`,
      );
      return false;
    }

    console.log(`[NOTIFICATION:SENT] Brief ${record.id} dispatched to Slack`);
    return true;
  } catch (error) {
    console.error("[NOTIFICATION:ERROR] Failed to dispatch webhook", error);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}
