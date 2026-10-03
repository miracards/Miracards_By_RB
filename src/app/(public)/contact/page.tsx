import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Wedding Card Quote & Consultation for Gujarat and Worldwide | Mira Cards",
  description:
    "Request a custom wedding card quote or design consultation. Mira Cards serves Ahmedabad, Vadodara, Gandhinagar and international customers by phone, email, and WhatsApp.",
  keywords: [
    "contact wedding card maker Surat",
    "book wedding card consultation Gujarat",
    "wedding invitation quote India",
    "wedding card price inquiry",
    "custom wedding card booking",
    "WhatsApp wedding card inquiry",
    "free wedding invitation quotation",
     "wedding cards near me",
    "wedding invitation shop Ahmedabad",
    "wedding card shop Ahmedabad",
    "marriage card shop Ahmedabad",
    "wedding invitation printing near me",
    "customized marriage cards Ahmedabad",
    "wedding card showroom Ahmedabad",
    "wedding card supplier Ahmedabad",
    "premium kankotri shop Ahmedabad",
    "wedding invitation designer near me",
    "wedding invitation quote Ahmedabad",
    "wedding card printing services Ahmedabad",
    "wedding invitation printing services",
    "wedding card consultation Gujarat",
    "international wedding invitation delivery",
  ],
  alternates: {
    canonical: "https://miracards.in/contact",
  },
  openGraph: {
    url: "https://miracards.in/contact",
    title: "Wedding Card Quote & Consultation | Mira Cards",
    description: "Request a wedding invitation quote for Gujarat or international delivery.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Mira Cards - Wedding Card Maker" }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
