"use client";

import React from "react";
import { useTheme } from "@/components/shared/ThemeProvider";

// ─── Base shimmer block ────────────────────────────────────────────────────────
interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ width = "100%", height = "16px", borderRadius = "6px", className, style }: SkeletonProps) {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <>
      <div
        className={`sk-shimmer${className ? ` ${className}` : ""}`}
        style={{
          width,
          height,
          borderRadius,
          background: dk
            ? "linear-gradient(90deg, #0c1f35 25%, #162d47 50%, #0c1f35 75%)"
            : "linear-gradient(90deg, #ede8df 25%, #f5f0e8 50%, #ede8df 75%)",
          backgroundSize: "200% 100%",
          animation: "sk-shimmer 1.6s infinite ease-in-out",
          flexShrink: 0,
          ...style,
        }}
      />
      <style>{`
        @keyframes sk-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .sk-shimmer { display: block; }
      `}</style>
    </>
  );
}

// ─── Collections listing page skeleton ────────────────────────────────────────
export function CollectionsPageSkeleton() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <div
      style={{
        background: dk ? "#071321" : "#FCFAF7",
        minHeight: "100vh",
        paddingTop: "clamp(120px, 14vh, 160px)",
        paddingBottom: "80px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <Skeleton width="100px" height="11px" borderRadius="4px" style={{ margin: "0 auto 14px" }} />
          <Skeleton width="320px" height="38px" borderRadius="8px" style={{ margin: "0 auto 16px" }} />
          <Skeleton width="240px" height="14px" borderRadius="4px" style={{ margin: "0 auto" }} />
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          {[80, 60, 90, 70, 65, 80, 75].map((w, i) => (
            <Skeleton key={i} width={`${w}px`} height="34px" borderRadius="20px" />
          ))}
        </div>

        {/* Card grid – 6 cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "32px",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: dk ? "#0c1f35" : "#FFFFFF",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <Skeleton width="100%" height="240px" borderRadius="0" />
              <div style={{ padding: "26px" }}>
                <Skeleton width="80px" height="10px" borderRadius="4px" style={{ marginBottom: "12px" }} />
                <Skeleton width="70%" height="22px" borderRadius="6px" style={{ marginBottom: "10px" }} />
                <Skeleton width="100%" height="12px" borderRadius="4px" style={{ marginBottom: "6px" }} />
                <Skeleton width="85%" height="12px" borderRadius="4px" style={{ marginBottom: "6px" }} />
                <Skeleton width="60%" height="12px" borderRadius="4px" style={{ marginBottom: "24px" }} />
                <Skeleton width="140px" height="36px" borderRadius="20px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Collection detail page skeleton ──────────────────────────────────────────
export function CollectionDetailSkeleton() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <div
      style={{
        background: dk ? "#071321" : "#FCFAF7",
        minHeight: "100vh",
        paddingTop: "clamp(120px, 14vh, 160px)",
        paddingBottom: "80px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Back link */}
        <Skeleton width="130px" height="12px" borderRadius="4px" style={{ marginBottom: "36px" }} />

        {/* Hero split grid */}
        <div
          className="sk-detail-hero"
          style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "60px", marginBottom: "80px", alignItems: "center" }}
        >
          <style>{`
            @media (max-width: 991px) {
              .sk-detail-hero { grid-template-columns: 1fr !important; gap: 40px !important; }
            }
          `}</style>
          <Skeleton width="100%" height="400px" borderRadius="20px" />
          <div>
            <Skeleton width="120px" height="10px" borderRadius="4px" style={{ marginBottom: "12px" }} />
            <Skeleton width="65%" height="42px" borderRadius="8px" style={{ marginBottom: "12px" }} />
            <Skeleton width="50%" height="16px" borderRadius="4px" style={{ marginBottom: "22px" }} />
            <Skeleton width="100%" height="12px" borderRadius="4px" style={{ marginBottom: "8px" }} />
            <Skeleton width="92%" height="12px" borderRadius="4px" style={{ marginBottom: "8px" }} />
            <Skeleton width="78%" height="12px" borderRadius="4px" style={{ marginBottom: "32px" }} />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <Skeleton width="18px" height="18px" borderRadius="50%" />
                <Skeleton width="60%" height="12px" borderRadius="4px" />
              </div>
            ))}
            <Skeleton width="180px" height="44px" borderRadius="24px" style={{ marginTop: "12px" }} />
          </div>
        </div>

        {/* Featured Designs heading */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
          <Skeleton width="18px" height="18px" borderRadius="50%" />
          <Skeleton width="200px" height="26px" borderRadius="6px" />
        </div>

        {/* Sub-category tabs */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "35px" }}>
          {[55, 70, 80, 90, 75, 100, 85, 110].map((w, i) => (
            <Skeleton key={i} width={`${w}px`} height="34px" borderRadius="20px" />
          ))}
        </div>

        {/* Card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ borderRadius: "16px", overflow: "hidden", background: dk ? "#0c1f35" : "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <Skeleton width="100%" height="300px" borderRadius="0" />
              <div style={{ padding: "20px" }}>
                <Skeleton width="70%" height="18px" borderRadius="6px" style={{ marginBottom: "10px" }} />
                <Skeleton width="100%" height="12px" borderRadius="4px" style={{ marginBottom: "6px" }} />
                <Skeleton width="80%" height="12px" borderRadius="4px" style={{ marginBottom: "18px" }} />
                <Skeleton width="100%" height="36px" borderRadius="20px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Featured collections homepage section skeleton ────────────────────────────
export function FeaturedCollectionsSkeleton() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <section className="featured-collections-skeleton-section" style={{ background: "var(--bg-secondary)", padding: "6rem 0" }}>
      <div className="container">
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
          <div>
            <Skeleton width="90px" height="10px" borderRadius="4px" style={{ marginBottom: "10px" }} />
            <Skeleton width="240px" height="36px" borderRadius="8px" />
          </div>
          <Skeleton width="160px" height="16px" borderRadius="4px" />
        </div>

        {/* 6-column card grid */}
        <style>{`
          @media (max-width: 767px) {
            .featured-collections-skeleton-section {
              padding: 2rem 0 !important;
            }

            .featured-collections-skeleton-grid {
              display: flex !important;
              flex-wrap: nowrap;
              overflow: hidden;
              gap: 0.75rem;
            }

            .featured-collections-skeleton-card {
              flex: 0 0 170px;
              height: 245px;
            }

            .featured-collections-skeleton-image {
              height: 155px !important;
              padding-bottom: 0 !important;
            }
          }
        `}</style>
        <div
          className="featured-collections-skeleton-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
          style={{ width: "100%" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="featured-collections-skeleton-card" style={{ borderRadius: "14px", overflow: "hidden", background: dk ? "#0c1f35" : "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <Skeleton className="featured-collections-skeleton-image" width="100%" style={{ paddingBottom: "115%", height: "0" }} borderRadius="0" />
              <div style={{ padding: "1.25rem", textAlign: "center" }}>
                <Skeleton width="80%" height="14px" borderRadius="4px" style={{ margin: "0 auto 8px" }} />
                <Skeleton width="55%" height="11px" borderRadius="4px" style={{ margin: "0 auto" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery page skeleton ─────────────────────────────────────────────────────
export function GalleryPageSkeleton() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "8rem", paddingBottom: "7rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Skeleton width="120px" height="10px" borderRadius="4px" style={{ margin: "0 auto 14px" }} />
          <Skeleton width="360px" height="38px" borderRadius="8px" style={{ margin: "0 auto 14px" }} />
          <Skeleton width="480px" height="14px" borderRadius="4px" style={{ margin: "0 auto 8px" }} />
          <Skeleton width="360px" height="14px" borderRadius="4px" style={{ margin: "0 auto" }} />
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "3.5rem" }}>
          {[55, 130, 150, 120, 140, 110, 140].map((w, i) => (
            <Skeleton key={i} width={`${w}px`} height="36px" borderRadius="999px" />
          ))}
        </div>

        {/* Image grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ borderRadius: "16px", overflow: "hidden", background: dk ? "#0c1f35" : "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <Skeleton width="100%" height="280px" borderRadius="0" />
              <div style={{ padding: "1.5rem" }}>
                <Skeleton width="55px" height="20px" borderRadius="4px" style={{ marginBottom: "12px" }} />
                <Skeleton width="80%" height="18px" borderRadius="6px" style={{ marginBottom: "8px" }} />
                <Skeleton width="60%" height="12px" borderRadius="4px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
