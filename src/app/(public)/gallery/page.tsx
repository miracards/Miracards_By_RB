import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Wedding Card Maker Portfolio & Real Wedding Gallery | Mira Cards",
  description:
    "Explore our real wedding invitation portfolio. Custom card making projects designed for clients in Surat, Gujarat, India, USA, Australia & worldwide. Browse handcrafted luxury cards, box sets, laser-cut designs, digital invites & babyshower cards.",
  keywords: [
    "wedding invitation portfolio India",
    "real wedding cards gallery",
    "custom wedding card portfolio Surat",
    "luxury invitation design portfolio",
    "wedding card maker portfolio Gujarat",
    "handcrafted invitation gallery India",
    "digital wedding invitation gallery",
    "babyshower card gallery",
  ],
  alternates: {
    canonical: "https://miracards.in/gallery",
  },
  openGraph: {
    url: "https://miracards.in/gallery",
    title: "Wedding Card Maker Portfolio & Real Wedding Gallery | Mira Cards",
    description: "Browse our real wedding card portfolio — shipping to India, USA, Australia & worldwide.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mira Cards Real Wedding Portfolio" }],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
