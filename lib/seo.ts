import type { Metadata } from "next";

export function createPageMetadata(title: string, description: string): Metadata {
  const socialTitle = `${title} | DIGITALE MEDIA`;

  return {
    title,
    description,
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      siteName: "DIGITALE MEDIA",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
