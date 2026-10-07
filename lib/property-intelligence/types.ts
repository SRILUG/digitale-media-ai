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
