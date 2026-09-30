import "./globals.css";

export const metadata = {
  title: "DIGITALE — Creative × Growth × Technology",
  description: "One team. One system. Real growth. DIGITALE builds brands, experiences and acquisition systems for ambitious businesses.",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}