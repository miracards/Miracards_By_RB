"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/shared/ThemeProvider";

const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection"));

export default function AboutClient() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <div
      style={{
        background: dk ? "#071321" : "#FCFAF7",
        minHeight: "100vh",
        paddingTop: "clamp(120px, 14vh, 160px)",
        color: dk ? "#FFFFFF" : "#0B1D3A",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          marginBottom: "80px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
            The Art of Invitations
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Our Story & Craftsmanship
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "18px",
              lineHeight: 1.7,
              color: dk ? "#d0dae6" : "#5F5F5F",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            At Mira Cards, we believe that a wedding invitation is not just stationery — it is
            the first chapter of your celebration, a tactile keepsake that honors your heritage.
          </p>
        </div>

        {/* Narrative / Split layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="about-split"
        >
          <style>{`
            @media (max-width: 991px) {
              .about-split {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
              }
            }
          `}</style>
          
          {/* Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "450px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            }}
          >
            <Image
              src="/featured-royal.png"
              alt="Handcrafted Invitation Studio"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Narrative Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2
              style={{
                fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 600,
                lineHeight: 1.25,
              }}
            >
              Exquisite Materials & Timeless Print Methods
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: 1.8,
                color: dk ? "#A0AEC0" : "#5F5F5F",
              }}
            >
              Founded with the vision to elevate traditional wedding stationery, Mira Cards fuses
              age-old craftsmanship with contemporary aesthetics. We source high-grade handmade paper,
              heavy cardboards, and luxury silk fabrics to create invitations that feel substantial
              and premium.
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: 1.8,
                color: dk ? "#A0AEC0" : "#5F5F5F",
              }}
            >
              Whether it is the reflective brilliance of hot foil stamping, the dimensional texture
              of embossed monograms, or the ultra-precise detailing of laser-cut templates, our artisans
              scrutinize every envelope, liner, and wax seal.
            </p>
          </div>
        </div>
      </div>

      {/* Render Process Section Component */}
      <ProcessSection />

      {/* Philosophy Block */}
      <div
        style={{
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div
          className="glass-ios"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "48px 36px",
            borderRadius: "24px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
              fontSize: "30px",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            Custom Tailored for Every Culture
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "15px",
              lineHeight: 1.8,
              color: dk ? "#A0AEC0" : "#5F5F5F",
              marginBottom: "32px",
            }}
          >
            Indian weddings are rich with sub-ceremonies, distinct customs, and multiple events.
            We design complete invitation suites that seamlessly integrate separate inserts for Mehndi,
            Sangeet, Barat, and Reception — customized with cultural symbolism and multi-lingual scripts.
          </p>
          <Link
            href="/contact"
            style={{
              background: "#C9A227",
              color: "#FFFFFF",
              border: "none",
              padding: "14px 36px",
              borderRadius: "30px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 4px 14px rgba(201,162,39,0.2)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#A88414";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(201,162,39,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#C9A227";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(201,162,39,0.2)";
            }}
          >
            Book Design Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
