import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";

// ==========================================================
// FONT
// Plus Jakarta Sans — clean, modern, slightly playful
// ==========================================================

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// ==========================================================
// METADATA
// ==========================================================

export const metadata: Metadata = {
  title: "Firman Bintang Narendra — Creative Developer",
  description:
    "Front-End Developer, UI/UX Designer, and Motion Creative focused on creating interactive digital experiences.",
  keywords: [
    "Firman Bintang Narendra",
    "Creative Developer",
    "Front-End Developer",
    "UI/UX Designer",
    "Motion Designer",
    "3D Web",
    "Interactive Web",
  ],
};

// ==========================================================
// ROOT LAYOUT
// ==========================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="relative min-h-full bg-white text-navy">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
