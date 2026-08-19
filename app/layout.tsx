import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HeritageVerse — Digital Preservation of India's Cultural Heritage",
    template: "%s | HeritageVerse",
  },
  description:
    "Explore India's most iconic heritage sites through immersive digital experiences. Discover temples, forts, caves, and monuments through interactive web, AR, and VR.",
  keywords: [
    "India heritage",
    "cultural heritage",
    "digital museum",
    "Taj Mahal",
    "Hampi",
    "UNESCO",
    "AR",
    "VR",
    "3D experience",
  ],
  authors: [{ name: "HeritageVerse Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://heritageverse.in",
    siteName: "HeritageVerse",
    title: "HeritageVerse — Digital Preservation of India's Cultural Heritage",
    description:
      "Explore India's most iconic heritage sites through immersive digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeritageVerse",
    description: "Explore India's Cultural Heritage Digitally",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        {/* Preconnect for Google Fonts loaded in globals.css */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[var(--hv-bg-primary)] text-[var(--hv-text-primary)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
