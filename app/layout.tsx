import "./globals.css";
export const metadata = {
 title: "DIGITALE MEDIA — Creative × Growth × Technology × Experiences",
 description: "DIGITALE MEDIA connects creative, growth, technology and experiences around the work that matters.",
 metadataBase: new URL("https://digitale-media.com"),
 openGraph: { title:"DIGITALE MEDIA — Ideas Have A Life.", description:"Creative × Growth × Technology × Experiences.", type:"website", siteName:"DIGITALE MEDIA" },
 twitter: { card:"summary_large_image", title:"DIGITALE MEDIA — Ideas Have A Life.", description:"Creative × Growth × Technology × Experiences." },
 icons: { icon:"/icon.svg" },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }