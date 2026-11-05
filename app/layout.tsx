import type { Metadata } from "next";
import { Geist, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const display = Playfair_Display({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const brand = Space_Grotesk({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-brand",
});

const title = "Mick Ploegaert — Software development student";
const description =
  "Portfolio of Mick Ploegaert, a software development student at Scalda in Terneuzen. Frontend work, and a way to get in touch.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${display.variable} ${brand.variable}`}>
      <body className="bg-[#f4f5f7] text-[#071433] antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
