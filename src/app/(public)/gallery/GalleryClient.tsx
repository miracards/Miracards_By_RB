"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/shared/ThemeProvider";
import { X, ExternalLink, Eye } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { GalleryPageSkeleton } from "@/components/shared/Skeleton";

const S3_BASE = process.env.NEXT_PUBLIC_S3_BASE_URL || "https://mira-cards.s3.eu-north-1.amazonaws.com";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  materials: string;
  printing: string;
  details: string;
}

export default function GalleryClient() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  const dk = theme === "dark";

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        if (data.images) {
          const mapped = data.images.map((img: any, idx: number) => ({
            id: img._id,
            title: img.title || `Design #${idx + 1}`,
            category: img.collectionId?.title || "Wedding Invitation",
            image: img.s3Url,
            materials: img.collectionId?.type === "Digital" ? "Digital Video, MP4" : "Premium heavy board stock, gold hot foil",
            printing: img.collectionId?.type === "Digital" ? "Digital Design" : "Gold Hot Foil Stamping",
            details: img.details || "Luxury handcrafted design suite.",
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCategories() {
      try {
        const res = await fetch("/api/collections", { cache: "force-cache" });
        const data = await res.json();
        if (data.collections) {
          setCategories(["All", ...data.collections.map((c: any) => c.title)]);
        }
      } catch (err) {
        console.error("Failed to fetch collections for gallery:", err);
      }
    }

    Promise.all([fetchGallery(), fetchCategories()]);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  // ── Quick inquiry: save to DB then open WhatsApp ───────────────────────────
  async function handleInquire(item: any) {
    const waText = encodeURIComponent(
      `Hi Mira Cards, I'm interested in inquiring about this design:\n\n` +
      `*Collection:* Gallery (${item.category})\n` +
      `*Design:* ${item.title}\n` +
      `*Details:* ${item.details || ""}\n` +
      `*Link:* ${typeof window !== "undefined" ? window.location.href : ""}`
    );
    // Persist (fire-and-forget)
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Gallery Visitor",
        phone: "unknown",
        collection: item.category,
        design: item.title,
        source: "whatsapp",
      }),
    }).catch(() => {});
    window.open(`https://wa.me/917046441356?text=${waText}`, "_blank", "noopener,noreferrer");
  }

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter(item => item.category === activeCategory);

  if (loading) return <GalleryPageSkeleton />;

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "8rem", paddingBottom: "7rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              color: "var(--gold)",
              fontWeight: 600,
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
              fontFamily: "var(--font-alt), sans-serif",
            }}
          >
            Portfolio & Inspiration
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "2.75rem",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.25,
              marginBottom: "1rem",
            }}
          >
            The Gallery of Real Weddings
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "0.9375rem",
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Explore our curated portfolio of bespoke invitation suites. Handcrafted with premium cardstocks, custom metal foils, and artisanal print finishes tailored to each couple's unique story.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "3.5rem",
          }}
        >
          {categories.map((cat: string) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "var(--font-alt), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.625rem 1.5rem",
                  borderRadius: "999px",
                  border: `1.5px solid ${isActive ? "var(--gold)" : dk ? "rgba(255,255,255,0.08)" : "rgba(11,29,58,0.08)"}`,
                  background: isActive ? "var(--gold)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--text)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.color = "var(--gold)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = dk ? "rgba(255,255,255,0.08)" : "rgba(11,29,58,0.08)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={item.id}
                onClick={() => setSelectedItem(item)}
              className="card-glass-ios"
              style={{
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: 
                    item.category === "Vastupujan Invitation" ? "9/16" :
                    item.category === "Wedding Invitation" ? "1/1" :
                    item.category === "Babyshower Invitation" ? "4/3" :
                    "4/3",
                  overflow: "hidden",
                  background: dk ? "#0c1f35" : "#f3ebe1",
                }}
              >
                {item.image.endsWith(".mp4") ? (
                  <video
                    src={item.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 500ms ease",
                    }}
                    preload="metadata"
                    playsInline
                    muted
                    loop
                    onMouseEnter={(e) => {
                      e.currentTarget.play().catch(() => {});
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      transition: "transform 500ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                )}
                {item.category === "Vastupujan Invitation" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(201, 162, 39, 0.9)",
                      color: "#FFFFFF",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "9px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      zIndex: 3,
                    }}
                  >
                    Play Video
                  </div>
                )}
                {/* View Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(11, 29, 58, 0.3)",
                    opacity: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "opacity 300ms ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0"; }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0B1D3A",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Eye size={20} />
                  </div>
                </div>
              </div>

              {/* Text details */}
              <div style={{ padding: "1.25rem 1.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-alt), sans-serif",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.category}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "1.125rem",
                    fontWeight: 400,
                    color: "var(--text)",
                    margin: "0 0 0.5rem 0",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.materials}
                </p>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>
              No custom suites found in this collection.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(7, 19, 33, 0.95)",
              zIndex: 1000,
              display: "grid",
              placeItems: "center",
              padding: "1.5rem 1.25rem",
              overflowY: "auto",
            }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Close button (top right of screen) */}
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                transition: "transform 200ms ease",
              }}
              className="hidden md:block"
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="lg:grid-cols-2 glass-ios"
              style={{
                position: "relative",
                maxWidth: "1000px",
                width: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "1fr",
                margin: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <style>{`
                .modal-media-container {
                  width: 100%;
                  height: auto;
                   aspect-ratio: ${
                    selectedItem.category === "Vastupujan Invitation" ? "9/16" :
                    selectedItem.category === "Wedding Invitation" ? "1/1" :
                    "4/3"
                  };
                }
                .modal-details-container {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  padding: 2.25rem 1.75rem;
                }
                @media (min-width: 640px) {
                  .modal-details-container {
                    padding: 2.5rem !important;
                  }
                }
                @media (min-width: 1024px) {
                  .modal-media-container {
                    height: 600px !important;
                    aspect-ratio: auto !important;
                  }
                  .modal-details-container {
                    padding: 3rem !important;
                  }
                }
              `}</style>

              {/* Close button on card */}
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "rgba(7, 19, 33, 0.7)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 110,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(7, 19, 33, 0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(7, 19, 33, 0.7)")}
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              {/* Modal Image / Video */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
                className="modal-media-container"
              >
                {selectedItem.image.endsWith(".mp4") ? (
                  <video
                    src={selectedItem.image}
                    controls
                    autoPlay
                    muted
                    playsInline
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: 
                          selectedItem.category === "Wedding Invitation" || 
                          selectedItem.category === "Babyshower Invitation"
                            ? "contain"
                            : "cover",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Modal Details */}
              <div className="modal-details-container">
                <span
                  style={{
                    fontFamily: "var(--font-alt), sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {selectedItem.category} Portfolio
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    color: "var(--text)",
                    margin: "0 0 1rem 0",
                    lineHeight: 1.25,
                  }}
                >
                  {selectedItem.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                    margin: "0 0 1.5rem 0",
                  }}
                >
                  {selectedItem.details}
                </p>

                {/* Features list */}
                <div
                  style={{
                    borderTop: "1px solid var(--glass-border)",
                    paddingTop: "1.25rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div style={{ marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-alt), sans-serif",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        display: "block",
                      }}
                    >
                      Materials Used
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--text)" }}>
                      {selectedItem.materials}
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-alt), sans-serif",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        display: "block",
                      }}
                    >
                      Print Methods
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--text)" }}>
                      {selectedItem.printing}
                    </span>
                  </div>
                </div>

                {/* Inquiry CTA */}
                <button
                  onClick={() => selectedItem && handleInquire(selectedItem)}
                  className="btn btn-whatsapp"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 2rem",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    borderRadius: "4px",
                    textAlign: "center",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Inquire About This Design
                  <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
