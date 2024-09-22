import "../globals.css";

import { Nunito_Sans } from "next/font/google";

const nuninto_sans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

export { metadata, viewport } from "next-sanity/studio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nuninto_sans.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
