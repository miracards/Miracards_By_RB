import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Luxury Wedding Card Maker & Invitation Designer Collections | Mira Cards",
  description:
    "Browse our curated luxury wedding card & invitation collections. Handcrafted traditional cards, royal box sets, laser-cut designs, acrylic suites, and digital video invitations. Serving Surat, Gujarat, India, USA, Australia & worldwide.",
  keywords: [
    "wedding card collections Surat",
    "luxury wedding invitation collections India",
    "box wedding invitation collection",
    "laser cut wedding card collection",
    "acrylic wedding invitation collection",
    "digital video invitation collection",
    "foil wedding card collection",
    "babyshower invitation collection",
  ],
  alternates: {
    canonical: "https://miracards.in/collections",
  },
  openGraph: {
    url: "https://miracards.in/collections",
    title: "Luxury Wedding Card Maker & Invitation Collections | Mira Cards",
    description: "Browse bespoke wedding card collections. Custom designs shipped to India, USA, Australia & worldwide.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mira Cards Invitation Collections" }],
  },
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}
