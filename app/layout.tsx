import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "DIGITALE MEDIA — Ideas Have A Life",
    template: "%s | DIGITALE MEDIA",
  },
  description: "DIGITALE MEDIA is a creative growth and technology studio building brands, digital products and experiences that move people.",
  metadataBase: new URL("https://digitalemedia.group"),
  openGraph: {
    title: "DIGITALE MEDIA — Creative × Growth × Technology × Experiences",
    description: "One team. One system. Real growth.",
    type: "website",
    siteName: "DIGITALE MEDIA",
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
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }