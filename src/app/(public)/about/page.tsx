import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Mira Cards - Premium Wedding Card Maker in Surat, Gujarat | Our Story",
  description:
    "Discover Mira Cards' heritage-inspired wedding stationery and modern invitation design. We serve customers in Ahmedabad, Vadodara, Gandhinagar, across India, and internationally.",
  keywords: [
    "about Mira Cards Surat",
    "wedding card maker story Gujarat",
    "luxury invitation designer India",
    "handcrafted wedding card studio Surat",
    "bespoke wedding card craftsmanship",
    "Indian wedding stationery studio",
  ],
  alternates: {
    canonical: "https://miracards.in/about",
  },
  openGraph: {
    url: "https://miracards.in/about",
    title: "About Mira Cards - Premium Wedding Card Maker in Surat, Gujarat",
    description: "Heritage craftsmanship meets modern luxury. Bespoke wedding cards designed in Surat, shipped worldwide.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About Mira Cards - Wedding Card Maker" }],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
