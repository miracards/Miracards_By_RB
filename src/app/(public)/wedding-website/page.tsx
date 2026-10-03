import type { Metadata } from "next";
import WeddingWebsiteClient from "./WeddingWebsiteClient";

export const metadata: Metadata = {
  title: "Digital Wedding Invitations & Website Design | Mira Cards",
  description:
    "Create personalized digital wedding invitations and a custom wedding website with RSVP, event itinerary, venue maps, and coordinated print stationery. Available across India and internationally.",
  keywords: [
    "digital wedding invitations Ahmedabad",
    "digital wedding invitation design",
    "online wedding invitation cards",
    "Indian wedding cards online",
    "customized wedding cards online",
    "custom wedding website maker",
    "wedding website designer India",
    "online RSVP wedding portal",
    "digital wedding invitation designer",
    "animated wedding website India",
    "wedding website maker Ahmedabad",
    "wedding website maker Vadodara",
    "wedding website maker Gandhinagar",
    "interactive wedding invitation",
    "online wedding invitation India",
    "wedding save the date cards",
    "personalized wedding logo",
    "wedding hashtag design",
    "wedding itinerary cards",
    "wedding RSVP cards",
    "personalized wedding invitation suite",
  ],
  alternates: {
    canonical: "https://miracards.in/wedding-website",
  },
  openGraph: {
    url: "https://miracards.in/wedding-website",
    title: "Digital Wedding Invitations & Website Design | Mira Cards",
    description: "Custom wedding websites, online RSVP, event itineraries, and digital invitations for India and overseas.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mira Cards - Custom Wedding Website Maker" }],
  },
};

export default function WeddingWebsitePage() {
  return <WeddingWebsiteClient />;
}
