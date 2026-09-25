import type { MetadataRoute } from "next";

const BASE = "https://miracards.in";

const CATEGORIES = [
  // Active dynamic collections
  "new-wedding-collection",
  "babyshower-video-invitation",
  "babyshower-invitation-card",
  // Existing product categories
  "royal-invitations",
  "box-wedding-invitations",
  "laser-cut-invitations",
  "foil-wedding-invitations",
  "acrylic-wedding-cards",
  "digital-wedding-invitations",
  // Additional SEO category pages
  "hindu-wedding-cards",
  "muslim-wedding-invitations",
  "sikh-wedding-invitations",
  "south-indian-wedding-invitations",
  "gujarati-wedding-cards",
  "destination-wedding-invitations",
];

const STATIC_PAGES = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { url: "/collections", priority: 0.95, changeFrequency: "daily" as const },
  { url: "/gallery", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/wedding-website", priority: 0.85, changeFrequency: "weekly" as const },
  { url: "/about", priority: 0.75, changeFrequency: "monthly" as const },
  { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
  { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = STATIC_PAGES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const categoryRoutes = CATEGORIES.map((slug) => ({
    url: `${BASE}/collections/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: slug.startsWith("new-") || slug.includes("babyshower") ? 0.95 : 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
