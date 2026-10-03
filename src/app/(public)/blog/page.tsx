import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Wedding Invitation Ideas & Guides for Ahmedabad | Mira Cards",
  description:
    "Explore wedding invitation ideas for Ahmedabad and Gujarat, from Gujarati kankotri wording and Indian wedding traditions to luxury card materials, printing, and digital invitations.",
  keywords: [
    "Gujarati marriage invitation cards",
    "customized wedding invitation design",
    "unique wedding invitation designs",
    "modern wedding invitation cards",
    "traditional wedding card designs",
    "handmade wedding invitation cards",
    "baby shower invitation cards Ahmedabad",
    "baby shower invitation design",
    "vastupujan invitation cards",
    "housewarming invitation cards Ahmedabad",
    "wedding invitation accessories",
    "gold foil wedding invitations",
    "laser cut wedding cards",
    "acrylic wedding invitations",
    "velvet wedding invitation cards",
    "embossed wedding invitations",
    "premium wedding card finishing",
  ],
  alternates: {
    canonical: "https://miracards.in/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
