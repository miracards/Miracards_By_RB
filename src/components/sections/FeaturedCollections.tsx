"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FeaturedCollectionsSkeleton } from "@/components/shared/Skeleton";

const S3_BASE = process.env.NEXT_PUBLIC_S3_BASE_URL || "https://mira-cards.s3.eu-north-1.amazonaws.com";

interface FeaturedColData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export default function FeaturedCollections() {
  const [collections, setCollections] = useState<FeaturedColData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();
        if (data.collections) {
          // Take top 6
          const items = data.collections.slice(0, 6).map((c: any) => {
            let subtitle = "Signature collection";
            if (c.slug === "wedding-invitation") subtitle = "Timeless elegance";
            else if (c.slug === "premium-money-envelop") subtitle = "Premium & luxurious";
            else if (c.slug === "engagement-invitation") subtitle = "Intricate & delicate";
            else if (c.slug === "babyshower-invitation") subtitle = "Pastel & floral";
            else if (c.slug === "welcome-boards") subtitle = "Modern & stylish";
            else if (c.slug === "vastupujan-invitation") subtitle = "Animated & traditional";

            return {
              id: c._id,
              title: c.title,
              subtitle: subtitle,
              image: c.coverImage || "",
              href: `/collections/${c.slug}`,
            };
          });
          setCollections(items);
        }
      } catch (err) {
        console.error("Failed to fetch featured collections:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) return <FeaturedCollectionsSkeleton />;
  return (
    <section className="section" style={{ background: "var(--bg-secondary)", padding: "6rem 0" }}>
      <div className="container">
        {/* Header Block */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <span
              className="text-label"
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Explore Our
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "var(--text)",
                lineHeight: 1.2,
              }}
            >
              Featured Collections
            </h2>
          </div>
          <Link
            href="/collections"
            style={{
              fontFamily: "var(--font-alt)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--text)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              borderBottom: "1.5px solid var(--gold)",
              paddingBottom: "4px",
              transition: "opacity var(--transition-fast)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            View All Collections <ArrowRight size={14} />
          </Link>
        </div>

        {/* Collections Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
          style={{ width: "100%" }}
        >
          {collections.map((col) => (
            <Link key={col.id} href={col.href} style={{ textDecoration: "none" }}>
              <div
                className="card-glass-ios"
                style={{
                  overflow: "hidden",
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image Wrapper */}
                <div style={{ position: "relative", width: "100%", paddingBottom: "115%", overflow: "hidden" }}>
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                </div>

                {/* Text Info */}
                <div style={{ padding: "1.25rem", textAlign: "center", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {col.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    {col.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
