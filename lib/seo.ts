import type { Metadata } from "next";

const siteUrl = "https://digitalemedia.group";
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "DIGITALE MEDIA — Creative × Growth × Technology × Experiences",
};

export function createPageMetadata(
  title: string,
  description: string,
  canonicalPath: string,
): Metadata {
  const socialTitle = `${title} | DIGITALE MEDIA`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      siteName: "DIGITALE MEDIA",
      url: new URL(canonicalPath, siteUrl).toString(),
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
