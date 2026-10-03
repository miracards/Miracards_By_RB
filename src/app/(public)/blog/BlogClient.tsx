"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/shared/ThemeProvider";

const POSTS = [
  {
    slug: "indian-wedding-card-wording-guide",
    title: "The Ultimate Guide to Indian Wedding Card Wording",
    excerpt: "Struggling with invitation wording? Learn how to structure invitation wording for different ceremonies, parental names, and formal blessings.",
    category: "Etiquette & Guides",
    date: "June 15, 2026",
    image: "/featured-royal.png",
  },
  {
    slug: "wedding-stationery-trends-2026",
    title: "Luxury Wedding Stationery Trends: What's Hot in 2026",
    excerpt: "From deep jewel-toned velvet boxes to minimalist frosted acrylic cards, discover the top invitation styles defining this season.",
    category: "Design Trends",
    date: "May 28, 2026",
    image: "/featured-box.png",
  },
  {
    slug: "how-to-plan-digital-invitations",
    title: "Going Digital: How to Integrate Video & RSVP Portals",
    excerpt: "Save costs and track guest attendance seamlessly by combining formal physical cards with custom interactive video suites.",
    category: "Digital Trends",
    date: "April 14, 2026",
    image: "/featured-digital.png",
  },
  {
    slug: "choosing-perfect-paper-stock",
    title: "Unveiling Paper Textures: Handmade, Kraft & Board stock",
    excerpt: "The texture of your invitation sets the expectation. A breakdown of linen, metallic, cotton rag, and luxury card weights.",
    category: "Materials",
    date: "March 03, 2026",
    image: "/featured-foil.png",
  },
];

export default function BlogClient() {
  const { theme } = useTheme();
  const dk = theme === "dark";
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Etiquette & Guides", "Design Trends", "Digital Trends", "Materials"];

  const filteredPosts =
    selectedCat === "All" ? POSTS : POSTS.filter((p) => p.category === selectedCat);

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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
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
            Mira Journal
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
            Insights & Inspiration
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
            Expert advice on invitation etiquette, paper selections, timing guides,
            and luxury design insights to help you craft your perfect invitation suite.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "50px",
          }}
        >
          {categories.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  background: active ? "#C9A227" : "var(--glass-bg)",
                  color: active ? "#FFFFFF" : dk ? "#E2E8F0" : "#0B1D3A",
                  border: `1.5px solid ${active ? "#C9A227" : "var(--glass-border)"}`,
                  backdropFilter: active ? "none" : "var(--glass-blur)",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Blog Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="blog-card card-glass-ios"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              
              {/* Image */}
              <div style={{ position: "relative", width: "100%", height: "200px" }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#C9A227",
                    marginBottom: "12px",
                  }}
                >
                  <span>{post.category}</span>
                  <span style={{ color: dk ? "#A0AEC0" : "#718096" }}>{post.date}</span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                    fontSize: "19px",
                    fontWeight: 600,
                    marginBottom: "10px",
                    lineHeight: 1.35,
                    color: dk ? "#FFFFFF" : "#0B1D3A",
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: "13.5px",
                    lineHeight: 1.6,
                    color: dk ? "#A0AEC0" : "#5F5F5F",
                    marginBottom: "20px",
                    flexGrow: 1,
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: dk ? "#FFFFFF" : "#0B1D3A",
                    textDecoration: "none",
                    borderBottom: "1.5px solid #C9A227",
                    alignSelf: "flex-start",
                    paddingBottom: "2px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A227")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = dk ? "#FFFFFF" : "#0B1D3A")}
                >
                  Read Article
                </Link>
              </div>
            </div>
          ))}
        </div>

        <section
          aria-labelledby="ahmedabad-wedding-guide-heading"
          style={{ maxWidth: "900px", margin: "5rem auto 0", lineHeight: 1.8 }}
        >
          <span
            style={{
              color: "#C9A227",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Ahmedabad Wedding Planning
          </span>
          <h2
            id="ahmedabad-wedding-guide-heading"
            style={{
              fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(26px, 3vw, 38px)",
              lineHeight: 1.25,
              margin: "0.6rem 0 1.25rem",
              color: dk ? "#FFFFFF" : "#0B1D3A",
            }}
          >
            A Thoughtful Guide to Wedding Invitations in Ahmedabad
          </h2>
          <p style={{ color: dk ? "#d0dae6" : "#5F5F5F", marginBottom: "1rem" }}>
            When comparing wedding invitation cards in Ahmedabad, start with the celebration itself:
            the number of events, who is hosting, your guest list, and how much time you need for
            proofing and printing. A local wedding card designer can help shape the wording and
            artwork, while a clear quote should outline paper, finishes, quantity, and delivery.
            Personalized wedding invitations can be traditional, contemporary, or a considered blend
            of both.
          </p>
          <h3
            style={{
              color: dk ? "#FFFFFF" : "#0B1D3A",
              fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
              fontSize: "21px",
              margin: "2rem 0 0.5rem",
            }}
          >
            Gujarati Traditions and Indian Wedding Suites
          </h3>
          <p style={{ color: dk ? "#d0dae6" : "#5F5F5F", marginBottom: "1rem" }}>
            Gujarati kankotri and Gujarati wedding invitation designs often bring family customs,
            auspicious motifs, and ceremony details together in one suite. Consider how a Hindu or
            broader Indian marriage invitation will introduce each event, and whether you need
            separate ceremony cards, inserts, or wording in more than one language. The same planning
            process works for engagement invitations and other family celebrations.
          </p>
          <h3
            style={{
              color: dk ? "#FFFFFF" : "#0B1D3A",
              fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
              fontSize: "21px",
              margin: "2rem 0 0.5rem",
            }}
          >
            Choosing Paper, Finishes, and Digital Details
          </h3>
          <p style={{ color: dk ? "#d0dae6" : "#5F5F5F", marginBottom: "1rem" }}>
            Compare paper and print samples before choosing details such as gold foil, embossing,
            laser cutting, acrylic, or a boxed presentation. A premium invitation suite may also
            include coordinated envelopes, save-the-date cards, RSVP inserts, menus, place cards,
            itineraries, or thank-you notes. Digital wedding invitations and an online RSVP page can
            complement printed cards when guests need quick updates or event information.
          </p>
          <p style={{ color: dk ? "#d0dae6" : "#5F5F5F" }}>
            For baby showers, housewarmings, and welcome displays, ask about matching artwork and
            current product options. Share your event date and requirements early so there is time to
            review a design, approve a proof, and plan printing or digital delivery.
          </p>
        </section>
      </div>
    </div>
  );
}
