"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/components/shared/ThemeProvider";
import { ArrowRight, Filter } from "lucide-react";
import { CollectionsPageSkeleton } from "@/components/shared/Skeleton";

const S3_BASE = process.env.NEXT_PUBLIC_S3_BASE_URL || "https://mira-cards.s3.eu-north-1.amazonaws.com";

interface CollectionData {
  slug: string;
  title: string;
  type: string;
  style: string;
  image: string;
  count: string;
  desc: string;
}

const GOLD = "#C9A227";
const BORDER = "#E7DFD4";

function CollectionsContent() {
  const { theme } = useTheme();
  const dk = theme === "dark";
  const searchParams = useSearchParams();

  const [collections, setCollections] = useState<CollectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [filterStyle, setFilterStyle] = useState("All");

  const types = ["All", "Print", "Digital"];
  const styles = ["All", "Traditional", "Luxury", "Modern"];

  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();
        if (data.collections) {
          setCollections(data.collections.map((c: any) => ({
            slug: c.slug,
            title: c.title,
            type: c.type,
            style: c.style,
            image: c.coverImage || "",
            count: c.count || "0 Designs",
            desc: c.description || "",
          })));
        }
      } catch (err) {
        console.error("Failed to fetch collections:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    const styleParam = searchParams.get("style");

    if (typeParam) {
      const formattedType = typeParam.charAt(0).toUpperCase() + typeParam.slice(1).toLowerCase();
      if (["Print", "Digital"].includes(formattedType)) {
        setFilterType(formattedType);
      }
    }

    if (styleParam) {
      let formattedStyle = styleParam.charAt(0).toUpperCase() + styleParam.slice(1).toLowerCase();
      // Map common style variations
      if (formattedStyle === "Royal" || formattedStyle === "Scroll" || formattedStyle === "Traditional") {
        formattedStyle = "Traditional";
      } else if (formattedStyle === "Luxury" || formattedStyle === "Box" || formattedStyle === "Foil") {
        formattedStyle = "Luxury";
      } else if (formattedStyle === "Modern" || formattedStyle === "Laser" || formattedStyle === "Acrylic") {
        formattedStyle = "Modern";
      }

      if (["Traditional", "Luxury", "Modern"].includes(formattedStyle)) {
        setFilterStyle(formattedStyle);
      }
    }
  }, [searchParams]);

  const filtered = collections.filter((col) => {
    const matchesType = filterType === "All" || col.type === filterType;
    const matchesStyle = filterStyle === "All" || col.style === filterStyle;
    return matchesType && matchesStyle;
  });

  if (loading) return <CollectionsPageSkeleton />;

  return (
    <div
      style={{
        background: dk ? "#071321" : "#FCFAF7",
        minHeight: "100vh",
        paddingTop: "clamp(120px, 14vh, 160px)",
        paddingBottom: "80px",
        color: dk ? "#FFFFFF" : "#0B1D3A",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header Block */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#C9A227",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Signature Design Suites
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "18px",
            }}
          >
            Wedding Stationery Collections
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "16px",
              color: dk ? "#d0dae6" : "#5F5F5F",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Discover our luxury card designs, structured from bespoke traditional print formats
            to premium digital video invitations.
          </p>
        </div>

        {/* Filters Panel */}
        <div
          className="filters-panel glass-ios"
          style={{
            borderRadius: "16px",
            padding: "20px 30px",
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <style>{`
            @media (max-width: 767px) {
              .filters-panel {
                flex-direction: column;
                align-items: flex-start !important;
                gap: 20px !important;
              }
            }
          `}</style>
          
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Filter size={16} color="#C9A227" />
            <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
              Filter Collections
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            {/* Type */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: dk ? "#A0AEC0" : "#718096" }}>Type:</span>
              <div style={{ display: "flex", gap: "6px" }}>
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    style={{
                      background: filterType === t ? "#C9A227" : "transparent",
                      color: filterType === t ? "#FFFFFF" : dk ? "#E2E8F0" : "#0B1D3A",
                      border: `1px solid ${filterType === t ? "#C9A227" : dk ? "rgba(255,255,255,0.15)" : "#CBD5E0"}`,
                      borderRadius: "20px",
                      padding: "4px 14px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: dk ? "#A0AEC0" : "#718096" }}>Style:</span>
              <div style={{ display: "flex", gap: "6px" }}>
                {styles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStyle(s)}
                    style={{
                      background: filterStyle === s ? "#C9A227" : "transparent",
                      color: filterStyle === s ? "#FFFFFF" : dk ? "#E2E8F0" : "#0B1D3A",
                      border: `1px solid ${filterStyle === s ? "#C9A227" : dk ? "rgba(255,255,255,0.15)" : "#CBD5E0"}`,
                      borderRadius: "20px",
                      padding: "4px 14px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Collections Catalog Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "40px",
          }}
          className="catalog-grid"
        >
          <style>{`
            @media (max-width: 479px) {
              .catalog-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          
          {filtered.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="catalog-card card-glass-ios"
                style={{
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >

                {/* Cover Image */}
                <div style={{ position: "relative", width: "100%", height: "240px", overflow: "hidden" }}>
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  />
                  <div
                    className="glass-ios"
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                      color: dk ? "#FFFFFF" : "#0B1D3A",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {col.count}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "26px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#C9A227", marginBottom: "8px" }}>
                    {col.style} • {col.type}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 600, color: dk ? "#FFFFFF" : "#0B1D3A", marginBottom: "12px" }}>
                    {col.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: dk ? "#A0AEC0" : "#5F5F5F", marginBottom: "24px", flexGrow: 1 }}>
                    {col.desc}
                  </p>
                  
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: dk ? "#FFFFFF" : "#0B1D3A",
                      borderBottom: "1.5px solid #C9A227",
                      alignSelf: "flex-start",
                      paddingBottom: "2px",
                    }}
                  >
                    Explore Designs <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <span
              style={{
                fontFamily: "var(--font-alt), sans-serif",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              No Collections Found
            </span>
            <h3
              style={{
                fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                fontSize: "24px",
                fontWeight: 600,
                color: dk ? "#FFFFFF" : "#0B1D3A",
                marginBottom: "1.5rem",
              }}
            >
              No matching suites found
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "14px",
                color: dk ? "#d0dae6" : "#5F5F5F",
                maxWidth: "450px",
                margin: "0 auto 2rem auto",
                lineHeight: 1.6,
              }}
            >
              We couldn't find any collections that match both the selected Type and Style. Please adjust your filters or reset them.
            </p>
            <button
              onClick={() => {
                setFilterType("All");
                setFilterStyle("All");
              }}
              style={{
                background: "#C9A227",
                color: "#FFFFFF",
                border: "none",
                padding: "10px 24px",
                borderRadius: "20px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#A88414"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#C9A227"; }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CollectionsClient() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg)" }} />}>
      <CollectionsContent />
    </Suspense>
  );
}
