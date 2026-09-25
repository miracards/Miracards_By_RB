import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Mira Cards",
  description: "Read the Privacy Policy for Mira Cards. Learn how we handle your personal consultation data, shipping details, and inquiry security parameters.",
  alternates: {
    canonical: "https://miracards.in/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
