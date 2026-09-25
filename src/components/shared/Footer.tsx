"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Share2, Rss, PlayCircle, Mail, Phone, MapPin } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import InstagramIcon from "./InstagramIcon";
import YouTubeIcon from "./YouTubeIcon";
import FacebookIcon from "./FacebookIcon";


const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/about#process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Request Sample", href: "/contact?type=sample" },
  { label: "Book Consultation", href: "/contact?type=consultation" },
];

export default function Footer() {
  const [collections, setCollections] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    async function getFooterCollections() {
      try {
        const res = await fetch("/api/collections", { cache: "force-cache" });
        const data = await res.json();
        if (data.collections) {
          setCollections(data.collections.map((c: any) => ({
            label: c.title,
            href: `/collections/${c.slug}`
          })));
        }
      } catch (e) {
        console.error(e);
      }
    }
    getFooterCollections();
  }, []);

  return (
    <footer
      role="contentinfo"
      className="site-footer"
      style={{
        background: "var(--color-blue-primary)",
        color: "#ffffff",
        paddingTop: "4rem",
      }}
    >
      {/* Gold top divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          marginBottom: "4rem",
        }}
      />

      <div className="container">
        <style>{`
          @media (max-width: 767px) {
          ."site-footer{
          padding-top: 2rem !important;
          }
            .site-footer-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              gap: 2rem 1.25rem !important;
            }

            .site-footer-brand,
            .site-footer-contact {
              grid-column: 1 / -1 !important;
            }
          }
        `}</style>
        <div
          className="site-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand Column */}
          <div className="site-footer-brand" style={{ gridColumn: "span 1" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  textDecoration: "none",
                  transition: "opacity 300ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span
                  style={{
                    fontFamily: "var(--font-signature)",
                    fontSize: "32px",
                    fontWeight: 200,
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  Miracards.in
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-alt)",
                    fontSize: "0.5625rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    paddingLeft: "2px",
                  }}
                >
                  Luxury Wedding Invitations
                </div>
              </Link>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "1.5rem",
                maxWidth: "280px",
              }}
            >
              We create bespoke wedding invitations tailored to every couple.
              Handcrafted with precision, delivered with love.
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: <InstagramIcon size={16} />, href: "https://instagram.com/miracards.in", label: "Instagram" },
                { icon: <FacebookIcon size={16} />, href: "https://facebook.com/miracards", label: "Facebook" },
                { icon: <YouTubeIcon size={16} />, href: "https://youtube.com/@miracards", label: "YouTube" },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="site-footer-collections">
            <h3
              style={{
                fontFamily: "var(--font-alt)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Collections
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {collections.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      transition: "color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-alt)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      transition: "color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="site-footer-contact">
            <h3
              style={{
                fontFamily: "var(--font-alt)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Get In Touch
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { Icon: Phone, text: "+91 70464 41356", href: "tel:+917046441356" },
                { Icon: Mail, text: "miracards.in@gmail.com", href: "mailto:miracards.in@gmail.com" },
                { Icon: MapPin, text: "India", href: "/contact" },
              ].map(({ Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    transition: "color var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                >
                  <Icon size={14} strokeWidth={1.5} style={{ flexShrink: 0, color: "var(--gold)" }} />
                  {text}
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20wedding%20invitations."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{
                marginTop: "1.5rem",
                width: "100%",
                justifyContent: "center",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <WhatsAppIcon size={16} style={{ marginRight: "0.5rem" }} />
              WhatsApp Us Now
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1.5rem",
            paddingBottom: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            © {new Date().getFullYear()} Mira Cards. All rights reserved. Handcrafted in India.
          </p>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "color var(--transition-fast)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
