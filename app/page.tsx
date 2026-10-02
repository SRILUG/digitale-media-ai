import type { Metadata } from "next";
import HomeArtDirected from "@/components/home/home-art-directed";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "DIGITALE MEDIA — Creative × Growth × Technology × Experiences",
    description: "One team. One system. Real growth.",
    type: "website",
    siteName: "DIGITALE MEDIA",
    url: "https://digitalemedia.group",
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "DIGITALE MEDIA — Creative × Growth × Technology × Experiences",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIGITALE MEDIA — Creative × Growth × Technology × Experiences",
    description: "One team. One system. Real growth.",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return <HomeArtDirected />;
}
