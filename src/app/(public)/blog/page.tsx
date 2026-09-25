import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Wedding Stationery Insights & Journal | Mira Cards",
  description: "Read the Mira Cards wedding blog. Discover wedding invitation trends, traditional Hindu and Muslim wording guides, paper selection tutorials, and design tips.",
  alternates: {
    canonical: "https://miracards.in/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
