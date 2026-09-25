import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | Mira Cards",
  description: "Read the Terms of Service for Mira Cards. Understand design proof approvals, physical production workflows, customization parameters, and shipping terms.",
  alternates: {
    canonical: "https://miracards.in/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
