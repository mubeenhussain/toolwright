import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { absoluteUrl, siteConfig } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Free Online Calculators for the US & West`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: "/toolwright-icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/toolwright-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "free online calculator",
    "mortgage calculator",
    "loan calculator",
    "BMI calculator",
    "compound interest calculator",
    "calorie calculator",
    "pregnancy due date calculator",
    "age calculator",
    "TDEE calculator",
    "macro calculator",
    "paycheck calculator",
    "credit card payoff calculator",
    "online tools USA",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "en-US": absoluteUrl("/"),
      en: absoluteUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: ["en_GB", "en_CA", "en_AU"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Free Calculators for the US & West`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.logo,
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — Free Calculators for the US & West`,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: [siteConfig.logo],
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
