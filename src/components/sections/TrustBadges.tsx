"use client";

import React from "react";
import { useTheme } from "@/components/shared/ThemeProvider";

/* ─── Elegant Gold SVG Icons ─── */
function IconHappyCouples() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconExclusiveDesigns() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      <path d="m15 5 3 3" />
    </svg>
  );
}

function IconCitiesServed() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCountriesDelivered() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconYearsCraftsmanship() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

const STATS = [
  {
    icon: <IconHappyCouples />,
    stat: "10K+",
    label: "Happy Couples",
  },
  {
    icon: <IconExclusiveDesigns />,
    stat: "500+",
    label: "Exclusive Designs",
  },
  {
    icon: <IconCitiesServed />,
    stat: "50+",
    label: "Cities Served",
  },
  {
    icon: <IconCountriesDelivered />,
    stat: "15+",
    label: "Countries Delivered",
  },
  {
    icon: <IconYearsCraftsmanship />,
    stat: "7+",
    label: "Years of Craftsmanship",
  },
];

export default function TrustBadges() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <section
      style={{
        background: dk ? "#071321" : "#FFFFFF",
        borderTop: `1px solid ${dk ? "rgba(255,255,255,0.08)" : "#E8E2D8"}`,
        borderBottom: `1px solid ${dk ? "rgba(255,255,255,0.08)" : "#E8E2D8"}`,
        padding: "2.5rem 0",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          paddingLeft: "clamp(24px, 5.5vw, 88px)",
          paddingRight: "clamp(24px, 5.5vw, 88px)",
        }}
      >
        <div
          style={{
            display: "grid",
            alignItems: "center",
          }}
          className="trust-grid"
        >
          <style>{`
            .trust-grid {
              grid-template-columns: repeat(5, 1fr);
            }
            @media (max-width: 1199px) {
              .trust-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 2.5rem 1.5rem;
              }
            }
            @media (max-width: 767px) {
              .trust-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem 1.25rem;
              }
              .trust-item:last-child {
                display: none;
              }
            }
            @media (max-width: 479px) {
              .trust-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.75rem 1rem;
              }
            }

            .trust-item {
              display: flex;
              align-items: center;
              gap: 1.25rem;
              justify-content: center;
              position: relative;
            }
            @media (min-width: 1200px) {
              .trust-item:not(:last-child)::after {
                content: '';
                position: absolute;
                right: 0;
                top: 15%;
                bottom: 15%;
                width: 1px;
                background: ${dk ? "rgba(255,255,255,0.12)" : "rgba(11,29,58,0.12)"};
              }
            }
          `}</style>

          {STATS.map(({ icon, stat, label }) => (
            <div key={label} className="trust-item">
              {/* Left Side: Icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>

              {/* Right Side: Stat & Label Stack */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                    fontSize: "clamp(26px, 2.5vw, 32px)",
                    fontWeight: 700,
                    color: dk ? "#FFFFFF" : "#0B1D3A",
                    lineHeight: 1.1,
                  }}
                >
                  {stat}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: dk ? "#A0AEC0" : "#5F5F5F",
                    marginTop: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
