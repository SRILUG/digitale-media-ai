import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Share the context behind your project with DIGITALE MEDIA.",
  alternates: { canonical: "/start" },
  openGraph: {
    title: "Start a project | DIGITALE MEDIA",
    description: "Share the context behind your project with DIGITALE MEDIA.",
    type: "website",
    siteName: "DIGITALE MEDIA",
    url: "https://digitalemedia.group/start",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a project | DIGITALE MEDIA",
    description: "Share the context behind your project with DIGITALE MEDIA.",
    images: ["/opengraph-image"],
  },
  robots: { index: false, follow: true },
};

export default function StartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
