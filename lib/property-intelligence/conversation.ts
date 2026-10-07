import { parsePreferences } from "./parser";
import type { DiscoveryField, DiscoveryState, PropertyPreferences } from "./types";

const discoveryOrder: DiscoveryField[] = [
  "purpose",
  "location",
  "budget",
  "bedrooms",
  "propertyType",
  "timeline",
  "priorities",
];

const fieldQuestions: Record<DiscoveryField, string> = {
  purpose: "Is this mainly for your own use or as an investment?",
  location: "Which part of Hyderabad would you like to focus on?",
  budget: "What budget range should I keep in mind?",
  bedrooms: "What configuration are you looking for — 2BHK, 3BHK or something else?",
  propertyType: "Would you prefer an apartment or a villa?",
  timeline: "When are you hoping to move or invest?",
  priorities: "Any must-have amenities or commute priorities?",
};

const clarificationQuestions: Record<DiscoveryField, string> = {
  purpose: "Could you clarify whether you plan to live in the home yourself or buy it as an investment?",
  location: "Could you name a Hyderabad neighbourhood, such as Gachibowli, Kondapur or Miyapur?",
  budget: "What approximate limit should I use? Include ₹, lakh or crore so I interpret the amount correctly.",
  bedrooms: "How many bedrooms do you need? You can reply with a number or a BHK configuration.",
  propertyType: "Would an apartment/flat or a villa/independent home suit you better?",
  timeline: "When are you hoping to move or invest? A rough month or time range is fine.",
  priorities: "Which matters most: an amenity like parking or a gym, or proximity to work, schools, metro or the airport?",
};

export interface DiscoveryTurn {
  preferences: PropertyPreferences;
  state: DiscoveryState;
  reply: string;
}

export function createDiscoveryState(): DiscoveryState {
  return {
    askedFields: [],
    clarifiedFields: [],
    stage: "discovery",
  };
}

function isFieldKnown(field: DiscoveryField, preferences: PropertyPreferences): boolean {
  switch (field) {
    case "purpose":
      return Boolean(preferences.purpose);
    case "location":
      return Boolean(preferences.location);
    case "budget":
      return Boolean(preferences.budget);
    case "bedrooms":
      return Boolean(preferences.bedrooms);
    case "propertyType":
      return Boolean(preferences.propertyType);
    case "timeline":
      return Boolean(preferences.timeline);
    case "priorities":
      return preferences.amenities.length > 0 || Boolean(preferences.commute);
  }
}

function hasEnoughForMatches(preferences: PropertyPreferences): boolean {
  const anchors = [
    preferences.location,
    preferences.budget,
    preferences.bedrooms,
    preferences.propertyType,
  ].filter(Boolean).length;
  const supportingSignals = [
    preferences.purpose,
    preferences.amenities.length > 0,
    preferences.commute,
  ].filter(Boolean).length;

  return anchors >= 2 || (anchors >= 1 && supportingSignals >= 2);
}

function matchesReply(preferences: PropertyPreferences): string {
  const details = [
    preferences.bedrooms ? `${preferences.bedrooms}BHK` : undefined,
    preferences.location,
  ].filter(Boolean).join(" in ");
  return `I have enough to shape an initial direction${details ? ` for ${details}` : ""}. Here are a few prototype options to compare.`;
}

export function nextDiscoveryQuestion(
  preferences: PropertyPreferences,
  state: DiscoveryState,
): string | undefined {
  if (state.stage === "matches") return undefined;
  if (state.pendingQuestion) return state.pendingQuestion;

  const field = discoveryOrder.find((candidate) =>
    !isFieldKnown(candidate, preferences) && !state.askedFields.includes(candidate),
  );
  return field ? fieldQuestions[field] : undefined;
}

export function advanceDiscovery(
  input: string,
  preferences: PropertyPreferences,
  state: DiscoveryState,
): DiscoveryTurn {
  const nextPreferences = parsePreferences(input, preferences, state.pendingField);
  const nextState: DiscoveryState = {
    ...state,
    askedFields: [...state.askedFields],
    clarifiedFields: [...state.clarifiedFields],
    stage: "discovery",
  };

  if (hasEnoughForMatches(nextPreferences)) {
    return {
      preferences: nextPreferences,
      state: { ...nextState, pendingField: undefined, pendingQuestion: undefined, stage: "matches" },
      reply: matchesReply(nextPreferences),
    };
  }

  if (
    state.pendingField
    && !isFieldKnown(state.pendingField, nextPreferences)
    && !nextState.clarifiedFields.includes(state.pendingField)
  ) {
    const field = state.pendingField;
    const question = clarificationQuestions[field];
    nextState.clarifiedFields.push(field);
    nextState.pendingQuestion = question;
    return {
      preferences: nextPreferences,
      state: nextState,
      reply: question,
    };
  }

  const field = discoveryOrder.find((candidate) =>
    !isFieldKnown(candidate, nextPreferences) && !nextState.askedFields.includes(candidate),
  );
  if (!field) {
    return {
      preferences: nextPreferences,
      state: { ...nextState, pendingField: undefined, pendingQuestion: undefined, stage: "matches" },
      reply: "I can show an initial set of prototype options using what you've shared so far.",
    };
  }

  const question = fieldQuestions[field];
  nextState.askedFields.push(field);
  nextState.pendingField = field;
  nextState.pendingQuestion = question;
  return { preferences: nextPreferences, state: nextState, reply: question };
}
