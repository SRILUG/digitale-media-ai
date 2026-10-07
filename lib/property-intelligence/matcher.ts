import { properties } from "./data";
import type { PropertyMatch, PropertyPreferences, PrototypeProperty } from "./types";

function locationMatches(preferred: string, property: PrototypeProperty): boolean {
  const requested = preferred.toLowerCase();
  return requested === "hyderabad"
    || property.location.toLowerCase() === requested
    || property.commuteTags.some((tag) => tag.includes(requested));
}

export function matchProperties(preferences: PropertyPreferences): PropertyMatch[] {
  const ranked = properties.map((property) => {
    let score = 48;
    const reasons: string[] = [];

    if (preferences.location) {
      if (locationMatches(preferences.location, property)) {
        score += 22;
        reasons.push(property.location.toLowerCase() === preferences.location.toLowerCase()
          ? `Located in your preferred area, ${property.location}.`
          : `Tagged for access to ${preferences.location}.`);
      } else {
        score -= 10;
      }
    }

    if (preferences.bedrooms) {
      if (property.bedrooms === preferences.bedrooms) {
        score += 20;
        reasons.push(`Matches your ${preferences.bedrooms}-bedroom configuration.`);
      } else {
        score -= Math.min(12, Math.abs(property.bedrooms - preferences.bedrooms) * 5);
      }
    }

    if (preferences.budget) {
      const budgetRatio = property.price / preferences.budget;
      if (budgetRatio <= 1) {
        score += 17;
        reasons.push("Fits within your stated budget.");
      } else if (budgetRatio <= 1.1) {
        score += 5;
        reasons.push("Sits slightly above your stated budget.");
      } else {
        score -= Math.min(25, Math.round((budgetRatio - 1) * 25));
      }
    }

    if (preferences.purpose) {
      if (property.purposeFit.includes(preferences.purpose)) {
        score += 9;
        reasons.push(preferences.purpose === "living"
          ? "Designed around everyday living."
          : "Includes features relevant to an investment brief.");
      } else {
        score -= 12;
      }
    }

    if (preferences.propertyType) {
      score += property.propertyType === preferences.propertyType ? 8 : -7;
      if (property.propertyType === preferences.propertyType) reasons.push(`Matches your ${preferences.propertyType} preference.`);
    }

    const matchingAmenities = preferences.amenities.filter((amenity) => property.amenities.includes(amenity));
    if (matchingAmenities.length > 0) {
      score += matchingAmenities.length * 3;
      reasons.push(`Includes ${matchingAmenities.join(", ")}.`);
    }

    if (preferences.commute && property.commuteTags.includes(preferences.commute)) {
      score += 6;
      reasons.push(`Tagged for ${preferences.commute} proximity.`);
    }

    if (reasons.length === 0) reasons.push(...property.matchFactors.slice(0, 1));
    const boundedScore = Math.max(42, Math.min(97, Math.round(score)));
    return { property, score: boundedScore, reasons: reasons.slice(0, 4) };
  });

  return ranked
    .filter(({ property }) => !preferences.budget || property.price <= preferences.budget * 1.45)
    .sort((a, b) => b.score - a.score || a.property.price - b.property.price)
    .slice(0, 6);
}
