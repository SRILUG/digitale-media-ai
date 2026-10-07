export type PropertyPurpose = "living" | "investment";
export type PropertyType = "apartment" | "villa";

export interface PropertyPreferences {
  location?: string;
  bedrooms?: number;
  budget?: number;
  purpose?: PropertyPurpose;
  propertyType?: PropertyType;
  amenities: string[];
  commute?: string;
  timeline?: string;
}

export type DiscoveryField =
  | "purpose"
  | "location"
  | "budget"
  | "bedrooms"
  | "propertyType"
  | "timeline"
  | "priorities";

export interface DiscoveryState {
  askedFields: DiscoveryField[];
  clarifiedFields: DiscoveryField[];
  pendingField?: DiscoveryField;
  pendingQuestion?: string;
  stage: "discovery" | "matches";
}

export interface PrototypeProperty {
  id: string;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  area: number;
  propertyType: PropertyType;
  amenities: string[];
  purposeFit: PropertyPurpose[];
  commuteTags: string[];
  description: string;
  matchFactors: string[];
  thingsToConsider: string[];
}

export interface PropertyMatch {
  property: PrototypeProperty;
  score: number;
  reasons: string[];
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export type ProductView =
  | "discovery"
  | "matches"
  | "detail"
  | "shortlist"
  | "compare"
  | "request"
  | "success";
