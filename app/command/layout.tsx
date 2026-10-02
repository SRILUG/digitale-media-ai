import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command",
  description: "A concept for connecting creative, growth, technology and experience work.",
  robots: { index: false, follow: true },
};

export default function CommandLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
