"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/shared/ThemeProvider";
import { ArrowLeft, Check, Sparkles, Send, X, Eye, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CollectionDetailSkeleton } from "@/components/shared/Skeleton";

const S3_BASE = process.env.NEXT_PUBLIC_S3_BASE_URL || "https://mira-cards.s3.eu-north-1.amazonaws.com";

const CATEGORY_META: Record<string, { subtitle: string; details: string[] }> = {
  "wedding-invitation": {
    subtitle: "Inspired by palaces, crafted for celebrations",
    details: ["Heritage design layouts", "Premium hot foil stamping", "Silk thread and ribbon borders", "Luxury custom envelopes included"],
  },
  "premium-money-envelop": {
    subtitle: "A grand chest of treasures",
    details: ["350 GSM premium paper", "Refined hot foil stamping", "Custom monogram printing", "Magnetic lock flaps"],
  },
  "engagement-invitation": {
    subtitle: "Intricate lace and geometric precision",
    details: ["Textured high-grade cardstock", "Intricate gold foil lettering", "Sleek double-page inserts", "Hand-tied wax seal options"],
  },
  "babyshower-invitation": {
    subtitle: "Pastel & floral designs",
    details: ["300 GSM textured art cardstock", "Soft pastel theme palettes", "Custom envelope inserts", "Laser-cut flap closures"],
  },
  "welcome-boards": {
    subtitle: "Create a stunning entrance statement",
    details: ["3mm frosted & clear acrylic options", "Sunboard high-fidelity print options", "Rich metallic gold or silver paint print", "Scratch-resistant finish"],
  },
  "vastupujan-invitation": {
    subtitle: "Elegant traditional invitations for your new home",
    details: ["High-Definition digital designs", "Customizable details & music", "Traditional rangoli & kalash graphics", "Easy WhatsApp & social sharing"],
  },
};

interface ClientProps {
  slug: string;
}

interface CardDetailData {
  code: string;
  title: string;
  image: string;
  video?: string;
  details: string;
  category?: string;
}

interface CollectionDetailData {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  details: string[];
  cards: CardDetailData[];
}

const GOLD = "#C9A227";
const BORDER = "#E7DFD4";

export default function CollectionDetailClient({ slug }: ClientProps) {
  const { theme } = useTheme();
  const dk = theme === "dark";
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [subCategory, setSubCategory] = useState<string>("All");

  const [data, setData] = useState<CollectionDetailData | null>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const subParam = params.get("subCategory");
      if (subParam) {
        setSubCategory(subParam);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`/api/collections/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to load collection details");
        }
        const json = await res.json();
        if (json.collection) {
          const col = json.collection;
          const subCats = json.subCategories || [];
          const imgs = json.images || [];

          setSubCategories(subCats);

          const subCatMap: Record<string, string> = {};
          subCats.forEach((sub: any) => {
            subCatMap[sub._id.toString()] = sub.name;
          });

          const meta = CATEGORY_META[slug] || {
            subtitle: "Bespoke custom designs",
            details: ["Customized details & names", "Premium materials & layouts", "Elegant finishes", "Dedicated designer support"],
          };

          const mappedCards = imgs.map((img: any) => {
            const isVideo = img.s3Url.endsWith(".mp4");
            return {
              code: img.code,
              title: img.title,
              image: img.s3Url,
              video: isVideo ? img.s3Url : undefined,
              details: img.details || "",
              category: img.subCategoryId ? subCatMap[img.subCategoryId.toString()] : undefined,
            };
          });

          setData({
            title: col.title,
            subtitle: meta.subtitle,
            image: col.coverImage || "",
            description: col.description || "",
            details: meta.details,
            cards: mappedCards,
          });
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load collection");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [slug]);

  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCard]);

  // ── Page-view tracking (fire-and-forget) ──────────────────────────────────
  useEffect(() => {
    if (slug) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      }).catch(() => {});
    }
  }, [slug]);

  // ── Quick inquiry: save to DB then open WhatsApp ───────────────────────────
  async function handleInquire(card: any, collectionTitle: string) {
    const waText = encodeURIComponent(
      `Hi Mira Cards, I would like to inquire about this design:\n\n` +
      `✨ *Design Details:*\n` +
      `• *Collection:* ${collectionTitle}\n` +
      `• *Design:* ${card.title}\n` +
      `• *Code:* ${card.code}\n` +
      `• *Product Link:* ${typeof window !== "undefined" ? window.location.href : ""}\n\n` +
      `Looking forward to hearing from you!`
    );
    // Persist inquiry (no-wait — open WhatsApp immediately)
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Website Visitor",
        phone: "unknown",
        collection: collectionTitle,
        design: card.title,
        code: card.code,
        source: "whatsapp",
      }),
    }).catch(() => {});
    window.open(`https://wa.me/917046441356?text=${waText}`, "_blank", "noopener,noreferrer");
  }


  if (loading) return <CollectionDetailSkeleton />;

  if (error || !data) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: dk ? "#071321" : "#FCFAF7", color: dk ? "#FFFFFF" : "#0B1D3A" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "24px", marginBottom: "16px" }}>Collection Not Found</h3>
        <p style={{ fontSize: "14px", color: dk ? "#A0AEC0" : "#5F5F5F", marginBottom: "24px" }}>{error || "The collection you requested does not exist."}</p>
        <Link href="/collections" style={{ background: "#C9A227", color: "#FFFFFF", padding: "10px 24px", borderRadius: "20px", fontWeight: 600, fontSize: "12px", textDecoration: "none" }}>Back to Collections</Link>
      </div>
    );
  }

  const filteredCards = slug === "welcome-boards" && subCategory !== "All"
    ? data.cards.filter((card: any) => card.category === subCategory)
    : data.cards;

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
        
        {/* Back Link */}
        <Link
          href="/collections"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: dk ? "#A0AEC0" : "#718096",
            textDecoration: "none",
            marginBottom: "36px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A227")}
          onMouseLeave={(e) => (e.currentTarget.style.color = dk ? "#A0AEC0" : "#718096")}
        >
          <ArrowLeft size={14} /> Back to collections
        </Link>

        {/* Intro Split Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1.8fr",
            gap: "60px",
            alignItems: "center",
            marginBottom: "80px",
          }}
          className="detail-split"
        >
          <style>{`
            @media (max-width: 991px) {
              .detail-split {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
              }
            }
          `}</style>

          {/* Left: Image Cover */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
            }}
          >
            <Image
              src={data.image}
              alt={data.title}
              fill
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right: Narrative Description */}
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "#C9A227",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Collection Profile
            </span>
            <h1
              style={{
                fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                marginBottom: "14px",
                lineHeight: 1.2,
              }}
            >
              {data.title}
            </h1>
            <h4
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                color: dk ? "#C9A227" : "#8A7010",
                marginBottom: "20px",
                fontStyle: "italic",
              }}
            >
              {data.subtitle}
            </h4>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: dk ? "#d0dae6" : "#5F5F5F",
                marginBottom: "30px",
              }}
            >
              {data.description}
            </p>

            {/* Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
              {data.details.map((detail, idx) => (
                <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "rgba(201,162,39,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check size={10} color="#C9A227" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>{detail}</span>
                </div>
              ))}
            </div>

            <Link
              href={`/contact?interest=${data.title}`}
              style={{
                background: "#C9A227",
                color: "#FFFFFF",
                padding: "14px 32px",
                borderRadius: "30px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
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
              Request Custom Quote
              <Send size={12} />
            </Link>
          </div>
        </div>

        {/* Gallery section */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
            <Sparkles size={18} color="#C9A227" />
            <h2 style={{ fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 600 }}>
              Featured Designs
            </h2>
          </div>

          <div style={{ width: "100%" }}>
            {slug === "welcome-boards" && subCategories.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "35px",
                  paddingBottom: "10px",
                  borderBottom: dk ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(11,29,58,0.08)",
                }}
              >
                {["All", ...subCategories.map((s) => s.name)].map((cat) => {
                  const isActive = subCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSubCategory(cat)}
                      style={{
                        background: isActive ? "var(--gold)" : "transparent",
                        color: isActive ? "#FFFFFF" : dk ? "rgba(255,255,255,0.7)" : "rgba(11,29,58,0.7)",
                        border: isActive ? "1px solid var(--gold)" : dk ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(11,29,58,0.15)",
                        padding: "8px 18px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = "var(--gold)";
                          e.currentTarget.style.borderColor = "var(--gold)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = dk ? "rgba(255,255,255,0.7)" : "rgba(11,29,58,0.7)";
                          e.currentTarget.style.borderColor = dk ? "rgba(255,255,255,0.15)" : "rgba(11,29,58,0.15)";
                        }
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "30px",
                width: "100%",
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredCards.map((card) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    key={card.code}
                    onClick={() => setSelectedCard(card)}
                    className="card-glass-ios"
                    style={{
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  >
                    {/* Product image with dynamic Aspect Ratio */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio:
                          slug === "vastupujan-invitation" ? "9/16" :
                          slug === "welcome-boards" ? "3/4" :
                          slug === "wedding-invitation" ? "1/1" :
                          "4/3",
                        overflow: "hidden",
                        background: dk ? "#0c1f35" : "#f3ebe1",
                      }}
                    >
                      {card.video ? (
                        <video
                          src={card.video}
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
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{
                            objectFit: "cover",
                            transition: "transform 500ms ease",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                        />
                      )}
                      <div
                        style={{
                          position: "absolute",
                          top: "16px",
                          left: "16px",
                          background: "rgba(201,162,39,0.9)",
                          color: "#FFFFFF",
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 700,
                          zIndex: 3,
                        }}
                      >
                        {card.code}
                      </div>

                      {slug === "babyshower-video-invitation" && (
                        <div
                          style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            background: "rgba(201, 162, 39, 0.9)",
                            color: "#FFFFFF",
                            padding: "3px 10px",
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
                          zIndex: 2,
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

                    {/* Product content */}
                    <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <h3 style={{ fontSize: "17px", fontWeight: 600, color: dk ? "#FFFFFF" : "#0B1D3A", marginBottom: "8px" }}>
                        {card.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: dk ? "#A0AEC0" : "#5F5F5F", marginBottom: "18px", flexGrow: 1 }}>
                        {card.details}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(card);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "center",
                          background: "transparent",
                          border: "1.5px solid #C9A227",
                          color: "#C9A227",
                          padding: "10px",
                          borderRadius: "30px",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          textDecoration: "none",
                          transition: "all 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#C9A227";
                          e.currentTarget.style.color = "#FFFFFF";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#C9A227";
                        }}
                      >
                        Inquire for code {card.code}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCard && (
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
            onClick={() => setSelectedCard(null)}
          >
            {/* Close button (top right of screen) */}
            <button
              onClick={() => setSelectedCard(null)}
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
              className="modal-grid glass-ios"
              style={{
                position: "relative",
                maxWidth: "1000px",
                width: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                margin: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <style>{`
                .modal-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                }
                .modal-media-container {
                  width: 100%;
                  height: auto;
                  aspect-ratio: ${
                    slug === "babyshower-video-invitation" ? "9/16" :
                    slug === "new-wedding-collection" ? "1/1" :
                    "4/3"
                  };
                  position: relative;
                  overflow: hidden;
                  background: transparent;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .modal-details-container {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  padding: 2.25rem 1.75rem;
                  overflow-y: auto;
                  max-height: 90vh;
                }
                @media (min-width: 640px) {
                  .modal-details-container {
                    padding: 2.5rem !important;
                  }
                }
                @media (min-width: 1024px) {
                  .modal-grid {
                    grid-template-columns: 1fr 1fr;
                  }
                  .modal-media-container {
                    height: 580px !important;
                    aspect-ratio: auto !important;
                  }
                  .modal-details-container {
                    padding: 3rem !important;
                    max-height: 580px;
                    overflow-y: auto;
                  }
                }
              `}</style>

              {/* Close button on card */}
              <button
                onClick={() => setSelectedCard(null)}
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
              <div className="modal-media-container">
                {selectedCard.video ? (
                  <video
                    src={selectedCard.video}
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
                      src={selectedCard.image}
                      alt={selectedCard.title}
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: 
                          slug === "new-wedding-collection" || 
                          slug === "babyshower-invitation-card"
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
                  {data.title} Portfolio
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
                  {selectedCard.title}
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
                  {selectedCard.details}
                </p>

                {/* Features list */}
                <div
                  style={{
                    borderTop: `1px solid var(--border-color)`,
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
                      {data.details[0] || "Premium materials"}
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
                      {data.details[1] || "High-quality print processes"}
                    </span>
                  </div>
                </div>

                {/* Inquiry CTA */}
                <button
                  onClick={() => handleInquire(selectedCard, data.title)}
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
    </div>
  );
}
