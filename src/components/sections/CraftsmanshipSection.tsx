"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Award, Palette, Fingerprint, Truck, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: <Sparkles size={20} strokeWidth={1.5} style={{ color: "var(--gold)" }} />,
    title: "Fully Customized",
    desc: "Designed uniquely for you",
  },
  {
    icon: <Award size={20} strokeWidth={1.5} style={{ color: "var(--gold)" }} />,
    title: "Premium Materials",
    desc: "Finest quality, always",
  },
  {
    icon: <Palette size={20} strokeWidth={1.5} style={{ color: "var(--gold)" }} />,
    title: "Expert Designers",
    desc: "Creative. Experienced. Dedicated.",
  },
  {
    icon: <Fingerprint size={20} strokeWidth={1.5} style={{ color: "var(--gold)" }} />,
    title: "Unlimited Personalization",
    desc: "Make it truly yours",
  },
  {
    icon: <Truck size={20} strokeWidth={1.5} style={{ color: "var(--gold)" }} />,
    title: "Worldwide Shipping",
    desc: "Delivered to your doorstep",
  },
  {
    icon: <ShieldCheck size={20} strokeWidth={1.5} style={{ color: "var(--gold)" }} />,
    title: "Quality Craftsmanship",
    desc: "Perfection in every piece",
  },
];

export default function CraftsmanshipSection() {
  return (
    <section className="section" style={{ background: "var(--bg-card)", padding: "6rem 0" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* COLUMN 1: Image (5/12 columns) */}
          <div className="lg:col-span-5" style={{ position: "relative", width: "100%", height: "450px" }}>
            <Image
              src="/why-choose-us.png"
              alt="Artisan sketching wedding card designs"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
              }}
            />
          </div>

          {/* COLUMN 2: Text Block & CTA (3/12 columns) */}
          <div className="lg:col-span-3">
            <span
              className="text-label"
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Why Choose Miracards.in
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.25rem",
                fontWeight: 300,
                color: "var(--text)",
                lineHeight: 1.25,
                marginBottom: "1.5rem",
              }}
            >
              Where Craftsmanship Meets Perfection
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "var(--text-muted)",
                marginBottom: "2rem",
              }}
            >
              Every invitation is a masterpiece, crafted with precision, passion and attention to every detail.
            </p>
            <Link
              href="/about"
              style={{
                fontFamily: "var(--font-alt)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--text)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                border: "1.5px solid var(--border-color)",
                borderRadius: "4px",
                padding: "0.875rem 1.75rem",
                transition: "all var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.backgroundColor = "var(--gold)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text)";
              }}
            >
              Know More About Us <ArrowRight size={14} />
            </Link>
          </div>

          {/* COLUMN 3: Feature Items Grid (4/12 columns) */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {FEATURES.map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Icon Wrapper */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--bg-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Info */}
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--text)",
                        marginBottom: "0.125rem",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        color: "var(--text-muted)",
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
