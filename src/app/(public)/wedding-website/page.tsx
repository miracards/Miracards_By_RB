import type { Metadata } from "next";
import WeddingWebsiteClient from "./WeddingWebsiteClient";

export const metadata: Metadata = {
  title: "Custom Wedding Website Maker & Digital Invitation Designer | Mira Cards",
  description:
    "Create beautiful custom wedding websites with online RSVP portals, interactive schedules, venue maps, and animated digital invitations. Perfectly coordinated with your Mira Cards paper invitation suite. Serving clients in India, USA, Australia & worldwide.",
  keywords: [
    "custom wedding website maker",
    "wedding website designer India",
    "online RSVP wedding portal",
    "digital wedding invitation designer",
    "animated wedding website India",
    "wedding website maker Surat",
    "interactive wedding invitation",
    "online wedding invitation India",
  ],
  alternates: {
    canonical: "https://miracards.in/wedding-website",
  },
  openGraph: {
    url: "https://miracards.in/wedding-website",
    title: "Custom Wedding Website Maker & Digital Invitation Designer | Mira Cards",
    description: "Interactive custom wedding websites & digital invitations — matching your paper invitation suite.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mira Cards - Custom Wedding Website Maker" }],
  },
};

export default function WeddingWebsitePage() {
  return <WeddingWebsiteClient />;
}
