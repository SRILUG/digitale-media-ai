import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Share the context behind your project with DIGITALE MEDIA.",
  robots: { index: false, follow: true },
};

export default function StartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
