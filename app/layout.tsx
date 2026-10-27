import type { Metadata } from "next";
import { Geist, Geist_Mono, PT_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Cursor } from "@/components/ui/Cursor";
import { Footer } from "@/components/sections/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", weight: ["400", "500"] });
const ptMono = PT_Mono({ subsets: ["latin"], variable: "--font-pt-mono", weight: "400" });
// Labels and buttons in the hero (ported from the drakken-website build).
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", weight: ["500", "700"] });

export const metadata: Metadata = {
  // A design draft for client review: keep it out of search results.
  robots: { index: false, follow: false },
  title: { default: "Drakken — E&I and Automation EPC", template: "%s — Drakken" },
  description:
    "Owner-led E&I and automation EPC integrator: power distribution, E-houses, SCADA, control systems and instrumentation for oil, gas and power projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${ptMono.variable} ${geistMono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
