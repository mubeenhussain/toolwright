import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  defaultOgImage,
  homeDescription,
  homeKeywords,
  homeTitle,
} from "@/lib/seo-meta";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const sans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = `${siteConfig.name} — ${homeTitle}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: homeDescription,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: siteConfig.icon, type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: siteConfig.icon, sizes: "180x180", type: "image/png" }],
  },
  keywords: [...homeKeywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  // Canonical lives on each page — do not pin "/" here (hurts deep pages).
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: ["en_GB", "en_CA", "en_AU"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: homeDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: homeDescription,
    creator: siteConfig.twitter,
    images: [defaultOgImage.url],
  },
  other: {
    "geo.region": "US",
    "content-language": "en-US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-ink">
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
