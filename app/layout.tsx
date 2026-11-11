import { cv } from "@/lib/cv";
import { formatOfferPrice, offer, offerDescription } from "@/lib/offer";
import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const description = offerDescription();
const socialTitle = `${offer.title} — ${formatOfferPrice()}`;

export const metadata: Metadata = {
  metadataBase: new URL(cv.identity.portfolioUrl),
  title: {
    default: `${cv.identity.name} — ${offer.title}`,
    template: "%s · Darwin Cardenas",
  },
  description,
  openGraph: {
    title: socialTitle,
    description,
    url: cv.identity.portfolioUrl,
    siteName: cv.identity.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
