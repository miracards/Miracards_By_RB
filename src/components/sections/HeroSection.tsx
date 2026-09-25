"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/shared/ThemeProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

/* ─── Icons ─── */
function IconCustomize() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
}
function IconMaterials() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}
function IconDelivery() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
}
function IconSupport() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}
function IconArrow() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
}

const FEATURES = [
  { title: "Fully Customizable", icon: <IconCustomize /> },
  { title: "Premium Materials", icon: <IconMaterials /> },
  { title: "Worldwide Delivery", icon: <IconDelivery /> },
  { title: "Design Support", icon: <IconSupport /> },
];

export default function HeroSection() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [p1, setP1] = useState(false);
  const [p2, setP2] = useState(false);
  const [p3, setP3] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".hl", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65 })
      .fromTo(".hh", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85 }, "-=0.45")
      .fromTo(".hd", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
      .fromTo(".hb", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(".hbg", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, "-=0.35");
    const canAnimate = window.matchMedia("(min-width: 1024px)").matches
      && (navigator.hardwareConcurrency || 8) > 4;
    if (canAnimate) {
      gsap.to(".hero-bg-float", { scale: 1.02, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true });
    }
  }, { scope: containerRef });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined" || window.innerWidth < 1024 || (navigator.hardwareConcurrency || 8) <= 4) return;
    const fn = (e: MouseEvent) => {
      gsap.to(".hero-bg-float", {
        x: (e.clientX - window.innerWidth / 2) * 0.012,
        y: (e.clientY - window.innerHeight / 2) * 0.012,
        duration: 1.6, ease: "power2.out", overwrite: "auto",
      });
    };
    el.addEventListener("mousemove", fn);
    return () => el.removeEventListener("mousemove", fn);
  }, []);

  const dk = theme === "dark";
  const navy = dk ? "#FFFFFF" : "#0B1D3A";
  const muted = dk ? "#d0dae6" : "#5F5F5F";
  const border = dk ? "rgba(255,255,255,0.12)" : "rgba(11,29,58,0.15)";

  /* gradient: strong on left (text), transparent right (shows image) */
  const leftGrad = dk
    ? "linear-gradient(to right,rgba(7,19,33,0.97) 0%,rgba(7,19,33,0.88) 30%,rgba(7,19,33,0.55) 52%,rgba(7,19,33,0.10) 75%,transparent 100%)"
    : "linear-gradient(to right,rgba(252,250,247,0.97) 0%,rgba(252,250,247,0.88) 30%,rgba(252,250,247,0.55) 52%,rgba(252,250,247,0.10) 75%,transparent 100%)";

  /* tablet gradient: strong on top (text), transparent bottom (shows image) */
  const topGrad = dk
    ? "linear-gradient(to bottom,rgba(7,19,33,0.97) 0%,rgba(7,19,33,0.85) 40%,rgba(7,19,33,0.4) 65%,transparent 100%)"
    : "linear-gradient(to bottom,rgba(252,250,247,0.97) 0%,rgba(252,250,247,0.85) 40%,rgba(252,250,247,0.4) 65%,transparent 100%)";

  return (
    <section
      id="luxury-hero"
      ref={containerRef}
      style={{ position: "relative", width: "100%", overflow: "hidden", backgroundColor: dk ? "#071321" : "#FCFAF7" }}
    >
      {/* ══ SCOPED CSS ══ */}
      <style>{`
        /* Section min-heights per device */
        #luxury-hero {
          min-height: 100vh;
          min-height: 100dvh;
        }
        @media (max-width:1279px) { #luxury-hero { min-height: 100vh; min-height: 100dvh; } }
        @media (max-width:1023px) { #luxury-hero { min-height: 100vh; min-height: 100dvh; } }
        @media (max-width:767px)  { #luxury-hero { min-height: 100vh; min-height: 100dvh; } }

        /* BG image containers */
        .hbg-desktop  { display:block; }
        .hbg-tablet-l { display:none;  }
        .hbg-tablet-p { display:none;  }
        .hbg-mobile   { display:none;  }

        /* Desktop ≥1280 */
        @media (min-width:1600px) {
          .hbg-desktop img { object-position: right center !important; }
        }
        @media (min-width:1280px) and (max-width:1599px) {
          .hbg-desktop img { object-position: 90% center !important; }
        }

        /* Tablet landscape 1024–1279 */
        @media (min-width:1024px) and (max-width:1279px) {
          .hbg-desktop  { display:none; }
          .hbg-tablet-l { display:block; }
          .hbg-tablet-l img { object-position: 80% center !important; }
        }

        /* Tablet portrait 600–1023 */
        @media (min-width:600px) and (max-width:1023px) {
          .hbg-desktop  { display:none; }
          .hbg-tablet-p { display:block; }
          .hbg-tablet-p img {
            object-position: center bottom !important;
            object-fit: contain !important;
          }
          /* gradient switches to top-to-bottom */
          .hero-overlay-left   { display:none !important; }
          .hero-overlay-top    { display:block !important; }
        }

        /* Mobile <600 */
        @media (max-width:599px) {
          .hbg-desktop  { display:none; }
          .hbg-mobile   { display:block; }
          .hbg-mobile img {
            object-position: center bottom !important;
            object-fit: contain !important;
          }
          .hero-overlay-left { display:none !important; }
          .hero-overlay-top  { display:block !important; }
        }

        /* Overlay visibility defaults */
        .hero-overlay-left { display:block; }
        .hero-overlay-top  { display:none;  }

        /* Heading scale */
        .hero-h1  { font-size:84px; line-height:1.04; }
        .hero-hi  { font-size:70px; }
        @media (max-width:1599px){ .hero-h1{font-size:72px;} .hero-hi{font-size:60px;} }
        @media (max-width:1279px){ .hero-h1{font-size:62px;} .hero-hi{font-size:52px;} }
        @media (max-width:1023px){ .hero-h1{font-size:52px;} .hero-hi{font-size:44px;} }
        @media (max-width:767px) { .hero-h1{font-size:40px;} .hero-hi{font-size:33px;} }
        @media (max-width:479px) { .hero-h1{font-size:34px;} .hero-hi{font-size:28px;} }

        /* Content position — centered desktop, top-aligned tablet/mobile */
        .hero-content-wrap {
          display:flex; align-items:center;
          min-height: 100vh;
          min-height: 100dvh;
          padding-top: clamp(110px,14vh,168px);
          padding-bottom: clamp(48px,7vh,96px);
        }
        @media (max-width:1023px) {
          .hero-content-wrap {
            align-items: flex-start;
            min-height: 100vh;
            min-height: 100dvh;
            padding-top: clamp(100px,12vh,140px);
            padding-bottom: 40px;
          }
        }
        @media (max-width:767px) {
          .hero-content-wrap {
            min-height: 100vh;
            min-height: 100dvh;
            padding-top: 90px;
            padding-bottom: 30px;
          }
        }

        /* Container widths */
        .hero-container {
          width:100%; max-width:1600px; margin:0 auto;
          padding-left:clamp(24px,5.5vw,88px);
          padding-right:clamp(24px,5.5vw,88px);
          box-sizing:border-box;
        }
        @media (max-width:1439px){ .hero-container{ max-width:1320px; } }
        @media (max-width:1279px){ .hero-container{ max-width:1200px; } }
        @media (max-width:1023px){ .hero-container{ max-width:90%; } }
        @media (max-width:767px) { .hero-container{ max-width:100%; padding-left:24px; padding-right:24px; } }

        /* CTA button row */
        .hero-btn-row { display:flex; flex-wrap:wrap; gap:12px; align-items:center; }
        @media (max-width:560px){
          .hero-btn-row { flex-direction:column; }
          .hero-btn-row > * { width:100% !important; justify-content:center; }
        }

        /* Responsive CTA buttons */
        .hero-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          height:52px; padding:0 28px; border-radius:999px;
          font-family:var(--font-inter),system-ui,sans-serif;
          font-size:12px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;
          text-decoration:none; white-space:nowrap;
          transition:all 300ms cubic-bezier(0.16,1,0.3,1);
        }
        @media (max-width:767px) {
          .hero-btn {
            height:48px; padding:0 22px; font-size:11px;
          }
        }

        /* Badge grid */
        .hero-badge-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
          border-top:1px solid ${border}; padding-top:24px;
          max-width:540px;
        }
        .hero-badge-item {
          display:flex; flex-direction:column; align-items:center;
          text-align:center; padding:0 8px; gap:8px;
          border-right:1px solid ${border};
        }
        .hero-badge-item:last-child {
          border-right:none;
        }
        @media (max-width:599px){
          .hero-badge-grid {
            grid-template-columns:repeat(2,1fr);
            gap:16px 0;
          }
          .hero-badge-item {
            border-right:1px solid ${border};
          }
          .hero-badge-item:nth-child(2n) {
            border-right:none;
          }
        }

        /* CTA shimmer */
        @keyframes hshimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .cta-sh { position:relative; overflow:hidden; }
        .cta-sh:hover::after {
          content:''; position:absolute; inset:0; border-radius:999px;
          background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.26) 50%,transparent 70%);
          background-size:200% auto; animation:hshimmer .85s linear;
          pointer-events:none;
        }

        /* Responsive Flow for Tablet/Mobile */
        @media (max-width: 1279px) {
          #luxury-hero {
            position: relative !important;
            display: block !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            height: auto !important;
          }
          .hero-content-container {
            position: relative !important;
            z-index: 2 !important;
            width: 100% !important;
          }
          .hero-content-wrap {
            position: relative !important;
            width: 100% !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            height: auto !important;
            padding-top: clamp(100px, 12vh, 140px) !important;
            /* Large bottom padding so the text/badges don't overlap the cards at the bottom */
            padding-bottom: clamp(160px, 24vh, 300px) !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
          .hero-bg-float {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            transform: none !important;
            margin: 0 !important;
            z-index: 0 !important;
          }
          .hbg-desktop {
            display: none !important;
          }
          .hbg-tablet-l, .hbg-tablet-p, .hbg-mobile {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
          .hbg-tablet-l img, .hbg-tablet-p img, .hbg-mobile img {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center bottom !important;
          }
          .hero-overlay-left {
            display: none !important;
          }
          .hero-overlay-top {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 1 !important;
          }
        }
        .br-desktop { display: inline; }
        @media (max-width: 1023px) {
          .br-desktop { display: none; }
        }
      `}</style>

      {/* ══ BACKGROUND LAYERS ══ */}
      <div className="hero-bg-float" style={{ position: "absolute", inset: "-3%", zIndex: 0, willChange: "transform" }}>

        {/* Desktop ≥1280: hero-bg.webp, cover, right center */}
        <div className="hbg-desktop" style={{ position: "absolute", inset: 0 }}>
          <Image src="/hero-bg.webp" alt="" aria-hidden fill priority sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "right center" }} />
        </div>

        {/* Tablet landscape 1024–1279: hero-tablet-landscape-bg.webp, cover, 80% center */}
        <div className="hbg-tablet-l" style={{ position: "absolute", inset: 0 }}>
          <Image src="/hero-tablet-landscape-bg.webp" alt="" aria-hidden fill sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "80% center" }} />
        </div>

        {/* Tablet portrait 600–1023: hero-tablet-bg.webp, contain, center bottom */}
        <div className="hbg-tablet-p" style={{ position: "absolute", inset: 0 }}>
          <Image src="/hero-tablet-bg.webp" alt="" aria-hidden fill sizes="100vw"
            style={{ objectFit: "contain", objectPosition: "center bottom" }} />
        </div>

        {/* Mobile <600: hero-mobile-bg.webp, contain, center bottom */}
        <div className="hbg-mobile" style={{ position: "absolute", inset: 0 }}>
          <Image src="/hero-mobile-bg.webp" alt="" aria-hidden fill sizes="100vw"
            style={{ objectFit: "contain", objectPosition: "center bottom" }} />
        </div>
      </div>

      {/* ══ GRADIENT OVERLAYS ══ */}
      {/* Left-to-right: for desktop/laptop (text on left, image right) */}
      <div className="hero-overlay-left" style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: leftGrad,
      }} />
      {/* Top-to-bottom: for tablet/mobile (text on top, image bottom) */}
      <div className="hero-overlay-top" style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: topGrad,
      }} />
      {/* Universal bottom vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to top,rgba(0,0,0,0.07) 0%,transparent 35%)"
      }} />

      {/* ══ FOREGROUND CONTENT ══ */}
      <div className="hero-content-container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="hero-content-wrap">
          <div className="hero-container">
            <div style={{ maxWidth: "1050px" }}>

              {/* Google Reviews Badge */}
              {/* <a
                href="https://www.google.com/search?q=Mira+Cards+Ahmedabad+Reviews#lrd=0x395e83707271b725:0x5f21803f4bf8002a,2,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="hl"
                style={{
                  opacity: 0,
                  marginBottom: "clamp(12px, 2vh, 20px)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: dk ? "rgba(255,255,255,0.03)" : "rgba(11,29,58,0.03)",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  border: `1px solid ${border}`,
                  backdropFilter: "blur(4px)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#C9A227";
                  e.currentTarget.style.background = dk ? "rgba(201,162,39,0.05)" : "rgba(201,162,39,0.03)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.background = dk ? "rgba(255,255,255,0.03)" : "rgba(11,29,58,0.03)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#4285F4" style={{ flexShrink: 0 }}>
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.286 4.114-3.518 0-6.386-2.87-6.386-6.386 0-3.518 2.868-6.386 6.386-6.386 1.63 0 3.117.618 4.254 1.62l3.197-3.197C19.06 2.232 15.894 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.896 0 10.967-4.247 10.967-11.24 0-.745-.088-1.464-.22-1.955H12.24z"/>
                </svg>
                <div style={{ display: "flex", gap: "2px", color: "#C9A227", flexShrink: 0 }}>
                  {"★".repeat(5).split("").map((star, i) => (
                    <span key={i} style={{ fontSize: "11px", display: "inline-flex", alignItems: "center" }}>{star}</span>
                  ))}
                </div>
                <span style={{ fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.03em", fontFamily: "var(--font-inter), sans-serif", color: dk ? "#E8E2D8" : "#0B1D3A" }}>
                  5.0 Rating (156 Google Reviews)
                </span>
              </a> */}

              {/* Label */}
              <div className="hl" style={{ opacity: 0, marginBottom: "clamp(12px, 2.5vh, 26px)" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontFamily: "var(--font-inter),system-ui,sans-serif",
                  fontSize: "11.5px", fontWeight: 600, letterSpacing: "6px", textTransform: "uppercase",
                  color: "#C9A227",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Crafting Timeless Memories
                </span>
              </div>

              {/* H1 */}
              <h1 className="hh hero-h1" style={{
                opacity: 0, marginBottom: "clamp(12px, 2vh, 22px)",
                fontFamily: "var(--font-heading),'Playfair Display',Georgia,serif",
                fontWeight: 700, color: navy, letterSpacing: "-0.015em",
              }}>
                Mira Cards<br className="br-desktop" />{" "}
                Exclusive Wedding Invitations<br className="br-desktop" />{" "}
                in Ahmedabad,<br className="br-desktop" />{" "}
                <span className="hero-hi" style={{
                  fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif",
                  fontStyle: "italic", fontWeight: 400, color: "#C9A227",
                  display: "inline-block", marginTop: "4px",
                }}>
                  Best Digital Invitation<br className="br-desktop" />{" "}
                  Design In Ahmedabad.
                </span>
              </h1>

              {/* Description */}
              <p className="hd" style={{
                opacity: 0, marginBottom: "clamp(16px, 3vh, 34px)",
                fontFamily: "var(--font-inter),system-ui,sans-serif",
                fontSize: "clamp(14px,1.1vw,17px)", fontWeight: 400,
                lineHeight: 1.85, color: muted, maxWidth: "480px",
              }}>
                From concept to creation, we craft exquisite wedding invitations that
                reflect your story, your culture and your celebration — with premium
                materials and dedicated design consultation.
              </p>

              {/* CTA buttons */}
              <div className="hb hero-btn-row" style={{ opacity: 0, marginBottom: "clamp(20px, 3.5vh, 36px)" }}>

                <Link href="/contact"
                  onMouseEnter={() => setP1(true)} onMouseLeave={() => setP1(false)}
                  className="cta-sh hero-btn"
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: p1 ? "#A88414" : "#C9A227",
                    boxShadow: p1 ? "0 12px 30px rgba(201,162,39,0.45)" : "0 4px 16px rgba(201,162,39,0.25)",
                    transform: p1 ? "translateY(-2px)" : "translateY(0)",
                  }}>
                  Get Personalized Quote
                  <span style={{ display: "flex", transform: p1 ? "translateX(4px)" : "translateX(0)", transition: "transform 220ms ease" }}><IconArrow /></span>
                </Link>

                <Link href="/collections"
                  onMouseEnter={() => setP2(true)} onMouseLeave={() => setP2(false)}
                  className="hero-btn"
                  style={{
                    color: p2 ? "#FFFFFF" : navy,
                    backgroundColor: p2 ? navy : "transparent",
                    border: `1.5px solid ${navy}`,
                    transform: p2 ? "translateY(-2px)" : "translateY(0)",
                  }}>
                  Explore Collections
                </Link>

                <a href="https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20a%20consultation."
                  target="_blank" rel="noopener noreferrer"
                  onMouseEnter={() => setP3(true)} onMouseLeave={() => setP3(false)}
                  className="hero-btn"
                  style={{
                    color: p3 ? "#25D366" : navy,
                    backgroundColor: p3 ? "rgba(37,211,102,0.07)" : "transparent",
                    border: `1.5px solid ${p3 ? "#25D366" : border}`,
                    transform: p3 ? "translateY(-2px)" : "translateY(0)",
                  }}>
                  <span style={{ color: "#25D366", display: "flex" }}><WhatsAppIcon size={17} /></span>
                  WhatsApp Consultation
                </a>
              </div>

              {/* Feature badges */}
              <div className="hero-badge-grid">
                {FEATURES.map((f, i) => (
                  <div key={f.title} className="hbg hero-badge-item" style={{
                    opacity: 0,
                  }}>
                    <span style={{ color: "#C9A227", display: "flex" }}>{f.icon}</span>
                    <span style={{
                      fontFamily: "var(--font-inter),system-ui,sans-serif",
                      fontSize: "10.5px", fontWeight: 600,
                      color: dk ? "#E8E2D8" : "#1B1B1B", lineHeight: 1.35,
                    }}>{f.title}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
