import { properties } from "./data";
import type { DiscoveryField, PropertyPreferences } from "./types";

const amenityTerms = [
  "pool",
  "gym",
  "security",
  "parking",
  "community",
  "green space",
  "garden",
  "schools",
  "metro",
];

const locationNames = [
  ...new Set([
    ...properties.map((property) => property.location),
    "Financial District",
    "HITEC City",
  ]),
].sort((a, b) => b.length - a.length);

function extractBudget(input: string, expectedField?: DiscoveryField): number | undefined {
  const currencyAmount = input.match(/(?:₹|rs\.?\s*)(\d[\d,]*(?:\.\d+)?)\s*(crores?|cr|lakhs?|lacs?|lac|l)?/i);
  const unitAmount = input.match(/(\d+(?:\.\d+)?)\s*(crores?|cr|lakhs?|lacs?|lac)\b/i);
  const explicitBudget = input.match(/budget(?:\s+(?:is|of|around|near))?\s*(\d+(?:\.\d+)?)/i);
  const contextualAmount = expectedField === "budget"
    ? input.match(/^\s*(?:up to|under|around|about|approximately)?\s*₹?\s*(\d[\d,]*(?:\.\d+)?)\s*(crores?|cr|lakhs?|lacs?|lac|l)\s*$/i)
    : null;
  const match = currencyAmount ?? unitAmount ?? explicitBudget ?? contextualAmount;
  if (!match) return undefined;

  const value = Number(match[1].replaceAll(",", ""));
  if (!Number.isFinite(value)) return undefined;
  const unit = (match[2] ?? "").toLowerCase();
  const multiplier = /^(crore|crores|cr)$/.test(unit)
    ? 10_000_000
    : /^(lakh|lakhs|lac|lacs|l)$/.test(unit)
      ? 100_000
      : 1;
  return Math.round(value * multiplier);
}

function extractLocation(input: string): string | undefined {
  const lowerInput = input.toLowerCase();
  const match = locationNames.find((location) => lowerInput.includes(location.toLowerCase()));
  if (match) return match;
  if (/\bhyderabad\b/i.test(input)) return "Hyderabad";
  return undefined;
}

export function parsePreferences(
  input: string,
  current: PropertyPreferences,
  expectedField?: DiscoveryField,
): PropertyPreferences {
  const lowerInput = input.toLowerCase();
  const bedroomMatch = lowerInput.match(/\b([1-6])[\s-]*(?:bhk|bed(?:room)?s?)\b|\b([1-6])[\s-]*br\b/)
    ?? (expectedField === "bedrooms" ? input.match(/^\s*(?:i need|looking for)?\s*([1-6])\s*$/i) : null);
  const bedrooms = bedroomMatch ? Number(bedroomMatch[1] ?? bedroomMatch[2] ?? bedroomMatch[3]) : undefined;
  const propertyType = /\b(villa|independent house|independent home)\b/i.test(input)
    ? "villa"
    : /\b(apartment|flat)\b/i.test(input)
      ? "apartment"
      : undefined;
  const purpose = /\b(invest(?:ment|ing)?|rental|tenant|yield)\b/i.test(input)
    ? "investment"
    : /\b(family|live|living|home for us|own use|self use)\b/i.test(input)
      ? "living"
      : undefined;
  const amenities = amenityTerms.filter((term) => lowerInput.includes(term));
  if (/\bschools?\b/i.test(input) && !amenities.includes("schools")) amenities.push("schools");
  const commute = /\b(school|schools)\b/i.test(input)
    ? "schools"
    : /\b(airport)\b/i.test(input)
      ? "airport"
      : /\bmetro\b/i.test(input)
        ? "metro"
        : /\b(workplace|office|commute|work)\b/i.test(input)
          ? "workplace"
          : undefined;
  const timelineMatch = input.match(/\b(today|immediately|right away|this month|next month|within\s+\d+\s+months?|in\s+\d+\s+months?)\b/i);

  return {
    location: extractLocation(input) ?? current.location,
    bedrooms: bedrooms ?? current.bedrooms,
    budget: extractBudget(input, expectedField) ?? current.budget,
    purpose: purpose ?? current.purpose,
    propertyType: propertyType ?? current.propertyType,
    amenities: [...new Set([...current.amenities, ...amenities])],
    commute: commute ?? current.commute,
    timeline: timelineMatch?.[0] ?? current.timeline,
  };
}
