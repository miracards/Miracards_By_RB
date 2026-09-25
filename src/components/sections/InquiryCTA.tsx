"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "../shared/WhatsAppIcon";

export default function InquiryCTA() {
  return (
    <section
      style={{
        background: "var(--blue)",
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background gradients */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-20%",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50%",
          right: "-20%",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Overlapping Card Mockups (5/12 columns) */}
          <div
            className="lg:col-span-5 hidden md:flex"
            style={{
              position: "relative",
              height: "380px",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
          >
            {/* Box Mockup (Background) */}
            <div
              style={{
                position: "absolute",
                width: "260px",
                height: "260px",
                left: "10%",
                bottom: "10%",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                transform: "rotate(-6deg) translateZ(-20px)",
              }}
            >
              <Image
                src="/luxury-box.png"
                alt="Luxury Blue Box Invitation Mockup"
                fill
                style={{ objectFit: "cover" }}
                sizes="260px"
              />
            </div>

            {/* Card Mockup (Foreground) */}
            <div
              style={{
                position: "absolute",
                width: "240px",
                height: "240px",
                right: "10%",
                top: "10%",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                transform: "rotate(8deg) translateZ(10px)",
              }}
            >
              <Image
                src="/luxury-card.png"
                alt="Luxury Wedding Card Mockup"
                fill
                style={{ objectFit: "cover" }}
                sizes="240px"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Copy and CTA Buttons (7/12 columns) */}
          <div className="lg:col-span-7">
            <span
              className="text-label"
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Ready to Create Your Dream Invitation?
            </span>
            
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#ffffff",
                lineHeight: 1.25,
                marginBottom: "1.25rem",
              }}
            >
              Let's bring your vision to life.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "rgba(255, 255, 255, 0.65)",
                maxWidth: "600px",
                marginBottom: "2.5rem",
              }}
            >
              Share your ideas and let our experts craft a bespoke invitation that tells your unique love story.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {/* Primary Quote Button */}
              <Link
                href="/contact"
                className="btn"
                style={{
                  borderRadius: "4px",
                  padding: "1rem 2.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "var(--gold)",
                  color: "#ffffff",
                  border: "1.5px solid var(--gold)",
                  transition: "all var(--transition-base)",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--gold-dark)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--gold)"; }}
              >
                Get Personalized Quote
                <ArrowRight size={16} />
              </Link>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20discuss%20our%20wedding%20invitation%20ideas."
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderRadius: "4px",
                  padding: "1rem 2.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  transition: "all var(--transition-base)",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                <WhatsAppIcon size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
