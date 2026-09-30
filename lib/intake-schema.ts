import { z } from "zod";

export const RawIntakeSchema = z.object({
  bot_field: z.string().optional(),
  id: z.never({ message: "Client is forbidden from providing an ID" }).optional(),
  created_at: z.never({ message: "Client is forbidden from providing created_at" }).optional(),
  client_ip: z.never({ message: "Client is forbidden from providing client_ip" }).optional(),
  user_agent: z.never({ message: "Client is forbidden from providing user_agent" }).optional(),

  practice: z.enum(["growth", "creative", "technology", "experiences", "not-sure", "not_sure"]),
  focus: z.array(z.string().max(100)).max(20).default([]),
  practiceFocus: z.string().max(200).optional(),
  scope: z.string().max(300).optional(),

  company: z.string().min(1, "Company/Brand is required").max(150),
  website: z.string().url("Invalid website URL").or(z.literal("")).optional(),
  industry: z.string().max(100).optional(),
  geography: z.string().max(100).optional(),
  currency: z.enum(["INR", "AED", "USD", "GBP", "EUR"]).default("INR"),
  budget: z.string().min(1, "Budget range is required").max(50),
  timeline: z.string().min(1, "Timeline is required").max(50),
  success: z.string().min(1, "Strategic outcome is required").max(2000),

  name: z.string().min(1, "Contact name is required").max(100),
  email: z.string().email("Invalid work email address").max(150),
  phone: z.string().max(30).optional(),
  role: z.string().max(100).optional(),
  source: z.string().max(100).default("web-start-diagnostic"),
}).strict();

export type RawIntakePayload = z.infer<typeof RawIntakeSchema>;

export interface NormalizedIntakeRecord {
  id: string;
  practice: "growth" | "creative" | "technology" | "experiences" | "not_sure";
  practice_focus: string | null;
  scope: string | null;
  business_name: string;
  website: string | null;
  industry: string | null;
  geography: string | null;
  currency: "INR" | "AED" | "USD" | "GBP" | "EUR";
  budget_range: string;
  timeline: string;
  strategic_outcome: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  contact_role: string | null;
  client_ip: string | null;
  user_agent: string | null;
  source: string;
}

export function normalizeIntake(
  id: string,
  raw: RawIntakePayload,
  meta: { ip: string | null; userAgent: string | null },
): NormalizedIntakeRecord {
  return {
    id,
    practice: raw.practice === "not-sure" ? "not_sure" : raw.practice,
    practice_focus: raw.practiceFocus?.trim() || (raw.focus.length ? raw.focus.join(", ") : null),
    scope: raw.scope?.trim() || null,
    business_name: raw.company.trim(),
    website: raw.website?.trim() || null,
    industry: raw.industry?.trim() || null,
    geography: raw.geography?.trim() || null,
    currency: raw.currency,
    budget_range: raw.budget.trim(),
    timeline: raw.timeline.trim(),
    strategic_outcome: raw.success.trim(),
    contact_name: raw.name.trim(),
    contact_email: raw.email.trim().toLowerCase(),
    contact_phone: raw.phone?.trim() || null,
    contact_role: raw.role?.trim() || null,
    client_ip: meta.ip,
    user_agent: meta.userAgent,
    source: raw.source,
  };
}
