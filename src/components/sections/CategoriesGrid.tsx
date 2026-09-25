"use client";

import Link from "next/link";

const CATEGORIES = [
  { label: "Hindu Wedding Cards", href: "/collections/hindu-wedding-cards", count: "120+ designs", emoji: "🕉️", accent: "#0B1D3A" },
  { label: "Muslim Invitations", href: "/collections/muslim-wedding-invitations", count: "80+ designs", emoji: "☪️", accent: "#153D73" },
  { label: "Sikh Wedding Cards", href: "/collections/sikh-wedding-invitations", count: "60+ designs", emoji: "✡️", accent: "#0B1D3A" },
  { label: "South Indian", href: "/collections/south-indian-wedding-invitations", count: "90+ designs", emoji: "🌺", accent: "#153D73" },
  { label: "Gujarati Cards", href: "/collections/gujarati-wedding-cards", count: "70+ designs", emoji: "🏵️", accent: "#0B1D3A" },
  { label: "Destination Wedding", href: "/collections/destination-wedding-invitations", count: "45+ designs", emoji: "✈️", accent: "#153D73" },
  { label: "Acrylic Cards", href: "/collections/acrylic-wedding-cards", count: "30+ designs", emoji: "💎", accent: "#0B1D3A" },
  { label: "Box Invitations", href: "/collections/box-wedding-invitations", count: "40+ designs", emoji: "📦", accent: "#153D73" },
];

export default function CategoriesGrid() {
  return (
    <section className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-label">Browse By Wedding Type</span>
          <h2 className="text-section-heading" style={{ color: "var(--text)" }}>
            Find Your Perfect Invitation
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card-glass-ios"
                style={{ padding: "1.75rem 1.5rem", cursor: "pointer" }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{cat.emoji}</div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.0625rem",
                    fontWeight: 500,
                    color: "var(--text)",
                    marginBottom: "0.375rem",
                  }}
                >
                  {cat.label}
                </div>
                <div style={{ fontFamily: "var(--font-alt)", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                  {cat.count}
                </div>
                <div
                  style={{
                    marginTop: "1.25rem",
                    width: "24px",
                    height: "1px",
                    background: "var(--gold)",
                    transition: "width var(--transition-base)",
                  }}
                  className="cat-line"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/collections" className="btn btn-secondary">
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
