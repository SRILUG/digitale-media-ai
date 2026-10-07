import type { PropertyPreferences } from "./types";

export function nextDiscoveryQuestion(preferences: PropertyPreferences): string | undefined {
  if (!preferences.location) return "Which part of Hyderabad would you like to focus on?";
  if (!preferences.budget) return "What budget range should I keep in mind?";
  if (!preferences.bedrooms) return "What configuration are you looking for — 2BHK, 3BHK or something else?";
  if (!preferences.purpose) return "Is this primarily for living or investment?";
  return undefined;
}

export function buildDiscoveryReply(preferences: PropertyPreferences): string {
  const question = nextDiscoveryQuestion(preferences);
  if (question) return question;

  const details = [
    preferences.bedrooms ? `${preferences.bedrooms}BHK` : undefined,
    preferences.location,
  ].filter(Boolean).join(" in ");
  return `I have enough to shape an initial direction${details ? ` for ${details}` : ""}. Here are a few prototype options to compare.`;
}
