import type { Metadata } from "next";
import PropertyIntelligence from "@/components/property-intelligence/property-intelligence";

export const metadata: Metadata = {
  title: { absolute: "Property Intelligence — DIGITALE MEDIA" },
  description: "A DIGITALE studio prototype exploring conversational property discovery, matching and decision support.",
  alternates: { canonical: "/work/property-intelligence" },
};

export default function PropertyIntelligencePage() {
  return <PropertyIntelligence />;
}
