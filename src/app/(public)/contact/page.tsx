import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Best Wedding Card Maker & Book Free Consultation | Mira Cards Surat",
  description:
    "Get in touch with Mira Cards — the top wedding card maker in Surat, Gujarat. Inquire about custom card making, request a free price quotation, or book a design consultation. Serving clients in India, USA, Australia & worldwide via WhatsApp.",
  keywords: [
    "contact wedding card maker Surat",
    "book wedding card consultation Gujarat",
    "wedding invitation quote India",
    "wedding card price inquiry",
    "custom wedding card booking",
    "WhatsApp wedding card inquiry",
    "free wedding invitation quotation",
  ],
  alternates: {
    canonical: "https://miracards.in/contact",
  },
  openGraph: {
    url: "https://miracards.in/contact",
    title: "Contact Best Wedding Card Maker & Book Free Consultation | Mira Cards",
    description: "Request a free quote or book your wedding card design consultation. Serving India, USA, Australia & worldwide.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Mira Cards - Wedding Card Maker" }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
