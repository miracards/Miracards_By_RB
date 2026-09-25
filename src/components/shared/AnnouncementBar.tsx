"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Globe2, Palette, Phone, Sparkles } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

const ANNOUNCEMENTS = [
  { text: "Handcrafted Luxury Wedding Invitations", icon: <Sparkles size={14} /> },
  { text: "Free Design Consultation", icon: <Palette size={14} />, href: "/contact" },
  { text: "Worldwide Delivery", icon: <Globe2 size={14} /> },
  { text: "+91 70464 41356", icon: <Phone size={14} />, href: "tel:+917046441356" },
  { text: "WhatsApp Consultation", icon: <WhatsAppIcon size={14} style={{ color: "#25D366" }} />, href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20luxury%20wedding%20invitations." }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile" | null>(null);

  // Detect screen size on client side
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setViewMode("desktop");
      } else if (window.innerWidth >= 768) {
        setViewMode("tablet");
      } else {
        setViewMode("mobile");
      }
    };
    
    // Set initial size
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scrolling for mobile view (one at a time)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!viewMode) {
    // Return empty placeholder during SSR to avoid hydration mismatch
    return <div style={{ height: "44px", backgroundColor: "#0B1D3A" }} />;
  }

  return (
    <div
      role="banner"
      style={{
        height: "44px",
        backgroundColor: "#0B1D3A",
        color: "#FFFFFF",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        position: "relative",
        zIndex: 100,
        borderBottom: "1px solid rgba(201, 162, 39, 0.15)",
        overflow: "hidden",
      }}
    >
      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Desktop Layout (Show all 5 items) */}
        {viewMode === "desktop" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              width: "100%",
            }}
          >
            {ANNOUNCEMENTS.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const content = (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: isHovered ? "#C9A227" : "#FFFFFF",
                    transition: "color 300ms ease",
                    cursor: item.href ? "pointer" : "default",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </span>
              );

              return (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span style={{ color: "#E8E2D8", opacity: 0.3, userSelect: "none" }}>
                      │
                    </span>
                  )}
                  <div
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ display: "inline-flex" }}
                  >
                    {item.href ? (
                      <Link href={item.href} style={{ textDecoration: "none" }}>
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Tablet Layout (Show first 3 items) */}
        {viewMode === "tablet" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              width: "100%",
            }}
          >
            {ANNOUNCEMENTS.slice(0, 3).map((item, idx) => {
              const isHovered = hoveredIndex === idx + 10;
              const content = (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: isHovered ? "#C9A227" : "#FFFFFF",
                    transition: "color 300ms ease",
                    cursor: item.href ? "pointer" : "default",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </span>
              );

              return (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span style={{ color: "#E8E2D8", opacity: 0.3, userSelect: "none" }}>
                      │
                    </span>
                  )}
                  <div
                    onMouseEnter={() => setHoveredIndex(idx + 10)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ display: "inline-flex" }}
                  >
                    {item.href ? (
                      <Link href={item.href} style={{ textDecoration: "none" }}>
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Mobile Layout (Rotates one item at a time with smooth transition) */}
        {viewMode === "mobile" && (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {ANNOUNCEMENTS.map((item, idx) => {
              const isActive = idx === currentIndex;
              const isHovered = hoveredIndex === idx + 20;
              const content = (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: isHovered ? "#C9A227" : "#FFFFFF",
                    transition: "color 300ms ease",
                    cursor: item.href ? "pointer" : "default",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </span>
              );

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx + 20)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? "visible" : "hidden",
                    transform: isActive ? "translateY(0)" : "translateY(15px)",
                    transition: "opacity 500ms ease, transform 500ms ease, visibility 500ms ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {item.href ? (
                    <Link href={item.href} style={{ textDecoration: "none" }}>
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
