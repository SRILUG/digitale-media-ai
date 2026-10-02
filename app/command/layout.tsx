import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command",
  description: "A concept for connecting creative, growth, technology and experience work.",
  alternates: { canonical: "/command" },
  openGraph: {
    title: "Command | DIGITALE MEDIA",
    description: "A concept for connecting creative, growth, technology and experience work.",
    type: "website",
    siteName: "DIGITALE MEDIA",
    url: "https://digitalemedia.group/command",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Command | DIGITALE MEDIA",
    description: "A concept for connecting creative, growth, technology and experience work.",
    images: ["/opengraph-image"],
  },
  robots: { index: false, follow: true },
};

export default function CommandLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
