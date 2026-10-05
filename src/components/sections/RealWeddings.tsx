"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const IMAGES = [
  { src: "/real-wedding-1.png", alt: "Cream and gold foil flatlay wedding card" },
  { src: "/real-wedding-2.png", alt: "Navy blue velvet box invitation set" },
  { src: "/real-wedding-3.png", alt: "Acrylic wedding card with gold text and leaves" },
  { src: "/real-wedding-4.png", alt: "Deep red laser cut invitation suite" },
];

export default function RealWeddings() {
  return (
    <section className="section" style={{ background: "var(--bg-card)", padding: "6rem 0" }}>
      <div className="container">
        <div className="real-weddings-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Text Title Card (1st Column) */}
          <div
            style={{
              background: "var(--blue)",
              borderRadius: "8px",
              padding: "2.5rem 2rem",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "360px",
            }}
          >
            <span
              className="text-label"
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Real Weddings
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 300,
                lineHeight: 1.25,
                color: "#ffffff",
                marginBottom: "1rem",
              }}
            >
              Real Stories,
              <br />
              Real Celebrations
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "2rem",
              }}
            >
              See how our invitations became part of beautiful beginnings.
            </p>
            <Link
              href="/gallery"
              style={{
                fontFamily: "var(--font-alt)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--gold)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                transition: "opacity var(--transition-fast)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Explore Gallery <ArrowRight size={14} />
            </Link>
          </div>

          <div className="real-weddings-image-viewport">
            <div className="real-weddings-image-track">
              {[IMAGES, IMAGES].map((imageSet, setIndex) => (
                <div
                  key={setIndex}
                  className={`real-weddings-image-group${setIndex === 1 ? " real-weddings-image-group--duplicate" : ""}`}
                  aria-hidden={setIndex === 1}
                >
                  {imageSet.map((img) => (
                    <div
                      key={img.src}
                      className="real-weddings-image-card group cursor-pointer"
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(-6px)";
                        el.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(0)";
                        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 639px) 82vw, (max-width: 1024px) 50vw, 20vw"
                        style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                        className="group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
