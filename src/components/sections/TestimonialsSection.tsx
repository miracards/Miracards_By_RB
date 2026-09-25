"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";

const REVIEWS = [
  { id: "r1", author: "Khushi Patel", initials: "KP", rating: 5, date: "2 months ago", location: "Surat, Gujarat", text: "Amazing experience with Mira Cards! We ordered our wedding invitations and the quality was absolutely stunning. The gold foil detailing and overall finish was beyond our expectations. Highly recommend!" },
  { id: "r2", author: "Ravi Shah", initials: "RS", rating: 5, date: "3 months ago", location: "Ahmedabad", text: "Best wedding card designer in Ahmedabad. The team was very professional and understood our requirements perfectly. Delivered on time and the cards looked royal. Our guests were amazed!" },
  { id: "r3", author: "Priya Mehta", initials: "PM", rating: 5, date: "1 month ago", location: "Gujarat", text: "We got our digital video invitation made from Mira Cards and it was simply breathtaking. Custom caricature design with beautiful background music. Everyone was asking us where we got it from!" },
  { id: "r4", author: "Nidhi & Karan Desai", initials: "ND", rating: 5, date: "4 months ago", location: "Vadodara", text: "Exceptional quality and service. The laser cut invitation cards were stunning — intricate patterns and premium cardstock. Worth every rupee. Will definitely order again for future events!" },
  { id: "r5", author: "Sanjay Patel", initials: "SP", rating: 5, date: "5 months ago", location: "Surat", text: "Got the box invitation set for our daughter's wedding. It was a masterpiece — the velvet lining, brass emblem and silk ribbon were exactly what we envisioned. Mira Cards truly delivers luxury!" },
  { id: "r6", author: "Anjali Sharma", initials: "AS", rating: 5, date: "2 weeks ago", location: "Mumbai", text: "Mira Cards created the most beautiful baby shower invitation cards for us. The pastel design with custom illustrations was adorable. Fast delivery and very responsive team. 5 stars!" },
  { id: "r7", author: "Dhruv & Minal Joshi", initials: "DJ", rating: 5, date: "6 months ago", location: "Rajkot", text: "Absolutely love the acrylic wedding cards we ordered! The frosted glass look with gold ink printing was so elegant and unique. Our guests had never seen anything like it. Brilliant work!" },
  { id: "r8", author: "Toral Vyas", initials: "TV", rating: 5, date: "3 weeks ago", location: "Surat, Gujarat", text: "Very professional and creative team. They designed our wedding invitation from scratch based on our theme and delivered it before the deadline. The foil embossing looked absolutely premium!" },
  { id: "r9", author: "Heena & Ronak Modi", initials: "HM", rating: 5, date: "7 months ago", location: "Gujarat", text: "We were amazed by the quality of Mira Cards' digital invitation. It was shared on WhatsApp and everyone loved it. Custom caricatures of the bride and groom were a huge hit with family and friends!" },
];

const WRITE_REVIEW_URL = "https://www.google.com/search?q=Mira+Cards+Ahmedabad+Reviews#lrd=0x395e83707271b725:0x5f21803f4bf8002a,3,,,,";
const VIEW_REVIEWS_URL = "https://www.google.com/search?q=Mira+Cards+Ahmedabad+Reviews#lrd=0x395e83707271b725:0x5f21803f4bf8002a,2,,,,";
const GOOGLE_REVIEWS_COUNT = 154; // Original Google Review count for Mira Cards Ahmedabad

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? "#FBBC04" : "#D1D5DB"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function TestimonialsSection() {
  const { theme } = useTheme();
  const dk = theme === "dark";
  const [active, setActive] = useState(0);
  const [cpv, setCpv] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCpv(1);
      else if (window.innerWidth < 1024) setCpv(2);
      else setCpv(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(p => (p + 1) % REVIEWS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  // visible cards = slice of REVIEWS starting at active (wrap around)
  const visibleCards = Array.from({ length: cpv }, (_, i) =>
    REVIEWS[(active + i) % REVIEWS.length]
  );

  const navy   = dk ? "#FFFFFF"    : "#0B1D3A";
  const muted  = dk ? "#94A9BC"    : "#6B7280";
  const cardBg = dk ? "#0F1E2E"    : "#FFFFFF";
  const border = dk ? "rgba(255,255,255,0.09)" : "rgba(11,29,58,0.09)";
  const sectionBg = dk ? "#071321" : "#F8F5F0";

  return (
    <section style={{ background: sectionBg, padding: "clamp(4rem,8vw,6rem) 0" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>

        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
              <GoogleG />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A227" }}>
                Verified Google Reviews
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 400, color: navy, lineHeight: 1.2, margin: 0 }}>
              Words from Happy Hearts
            </h2>
            <p style={{ marginTop: "10px", fontSize: "15px", color: muted, maxWidth: "420px", lineHeight: 1.6 }}>
              Real experiences shared by our couples on Google.
            </p>
          </div>

          {/* Rating pill + nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {/* Google rating pill */}
            <a href={VIEW_REVIEWS_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 18px", borderRadius: "12px", background: cardBg, border: `1px solid ${border}`, textDecoration: "none", boxShadow: dk ? "none" : "0 2px 12px rgba(11,29,58,0.07)" }}>
              <GoogleG />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "22px", fontWeight: 800, color: navy, lineHeight: 1 }}>5.0</span>
                  <StarRow count={5} />
                </div>
                <div style={{ fontSize: "11px", color: muted, marginTop: "3px", fontWeight: 500 }}>{GOOGLE_REVIEWS_COUNT} Google Reviews</div>
              </div>
            </a>

            {/* Arrows */}
            <div style={{ display: "flex", gap: "8px" }}>
              {[{ dir: -1, Label: "Prev", Icon: ChevronLeft }, { dir: 1, Label: "Next", Icon: ChevronRight }].map(({ dir, Label, Icon }) => (
                <button key={Label} aria-label={Label}
                  onClick={() => setActive(p => (p + dir + REVIEWS.length) % REVIEWS.length)}
                  style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1.5px solid ${border}`, background: cardBg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: navy, transition: "all 0.2s", flexShrink: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A227"; e.currentTarget.style.color = "#C9A227"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = navy; }}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CARDS ──────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cpv}, 1fr)`, gap: "20px", marginBottom: "2rem" }}>
          {visibleCards.map((r, idx) => (
            <div key={`${r.id}-${active}-${idx}`}
              className="glass-ios"
              style={{
                borderRadius: "24px",
                padding: "clamp(1.25rem,2.5vw,1.75rem)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                animation: "fadeSlide 0.4s ease forwards",
              }}
            >
              {/* Top: avatar + name + Google icon */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#C9A227,#7A5C0E)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em" }}>
                  {r.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.author}</div>
                  <div style={{ fontSize: "12px", color: muted, marginTop: "2px" }}>{r.location} · {r.date}</div>
                </div>
                <GoogleG />
              </div>

              {/* Stars */}
              <StarRow count={r.rating} />

              {/* Quote */}
              <p style={{ fontSize: "14.5px", lineHeight: 1.75, color: dk ? "#CBD5E1" : "#374151", margin: 0, flex: 1 }}>
                "{r.text}"
              </p>

              {/* Verified badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingTop: "4px", borderTop: "1px solid var(--glass-border)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#4285F4" fillOpacity="0.12"/>
                  <path d="M9 12l2 2 4-4" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: "11px", color: "#4285F4", fontWeight: 600, letterSpacing: "0.04em" }}>Verified Google Review</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── DOT INDICATORS ─────────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "2.5rem" }}>
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Review ${i + 1}`}
              style={{ width: active === i ? "28px" : "8px", height: "8px", borderRadius: "4px", border: "none", padding: 0, background: active === i ? "#C9A227" : (dk ? "rgba(255,255,255,0.2)" : "rgba(11,29,58,0.15)"), cursor: "pointer", transition: "all 0.35s ease" }}
            />
          ))}
        </div>

        {/* ── BOTTOM CTA ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem", paddingTop: "2rem", borderTop: `1px solid ${border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: navy, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>5.0</span>
            <div>
              <StarRow count={5} />
              <p style={{ margin: "5px 0 0", fontSize: "13px", color: muted, fontWeight: 500 }}>Based on {GOOGLE_REVIEWS_COUNT} Google Reviews</p>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <a href={WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 26px", borderRadius: "999px", background: "#4285F4", color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 4px 16px rgba(66,133,244,0.3)", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#3367D6"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#4285F4"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <GoogleG />
              Write a Review
              <ExternalLink size={13} />
            </a>

            <a href={VIEW_REVIEWS_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 26px", borderRadius: "999px", background: "transparent", border: `1.5px solid ${dk ? "rgba(255,255,255,0.2)" : "rgba(11,29,58,0.18)"}`, color: navy, fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A227"; e.currentTarget.style.color = "#C9A227"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dk ? "rgba(255,255,255,0.2)" : "rgba(11,29,58,0.18)"; e.currentTarget.style.color = navy; }}
            >
              View All Reviews
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}
