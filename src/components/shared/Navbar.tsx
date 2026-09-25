"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Sun, Moon, ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";
import WhatsAppIcon from "./WhatsAppIcon";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections", hasMegaMenu: true, id: "collections" },
  { label: "Gallery", href: "/gallery" },
  // { label: "Wedding Website", href: "/wedding-website" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blog" },
];

const COLLECTIONS_LINKS = [
  { label: "Wedding Invitation", href: "/collections/wedding-invitation" },
  { label: "Premium Money Envelop", href: "/collections/premium-money-envelop" },
  { label: "Engagement Invitation", href: "/collections/engagement-invitation" },
  { label: "Babyshower Invitation", href: "/collections/babyshower-invitation" },
  { label: "Welcome boards", href: "/collections/welcome-boards" },
  { label: "Vastupujan Invitation", href: "/collections/vastupujan-invitation" },
];

const INVITATION_ITEMS = [
  { label: "Wedding Invitation", href: "/collections/wedding-invitation", active: true },
  { label: "Engagement Invitation", href: "/collections/engagement-invitation", active: true },
  { label: "Babyshower Invitation", href: "/collections/babyshower-invitation", active: true },
  { label: "Grand Opening Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Grand%20Opening%20Invitations.", active: false },
  { label: "Bhagwat Katha Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Bhagwat%20Katha%20Invitations.", active: false },
  { label: "Shiv Katha Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Shiv%20Katha%20Invitations.", active: false },
  { label: "Satyanarayan Katha Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Satyanarayan%20Katha%20Invitations.", active: false },
  { label: "Randal Pooja Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Randal%20Pooja%20Invitations.", active: false },
  { label: "Janoi / Upnayan / Yagnopavit", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Janoi%20%2F%20Upnayan%20%2F%20Yagnopavit%20Invitations.", active: false },
  { label: "Annpraasan Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Annpraasan%20Invitations.", active: false },
  { label: "Birthday Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Birthday%20Invitations.", active: false },
  { label: "Kankupagla", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Kankupagla.", active: false },
  { label: "Ladva Vidhi", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Ladva%20Vidhi.", active: false },
  { label: "Mamera", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Mamera.", active: false },
  { label: "Mundan Ceremony", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Mundan%20Ceremony.", active: false },
  { label: "Naming Ceremony", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Naming%20Ceremony.", active: false },
  { label: "Punytithi Poster", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Punytithi%20Posters.", active: false },
  { label: "Reception Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Reception%20Invitations.", active: false },
  { label: "Vastu Pujan", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Vastu%20Pujan.", active: false },
  { label: "Retirement Invitation Card", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Retirement%20Invitation%20Cards.", active: false },
];

const WELCOME_BOARD_ITEMS = [
  { label: "Welcome boards", href: "/collections/welcome-boards", active: true },
  { label: "Wedding Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Wedding%20Welcome%20Boards.", active: false },
  { label: "Haldi Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Haldi%20Welcome%20Boards.", active: false },
  { label: "Mandap Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Mandap%20Welcome%20Boards.", active: false },
  { label: "Sangeet Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Sangeet%20Welcome%20Boards.", active: false },
  { label: "Janoi Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Janoi%20Welcome%20Boards.", active: false },
  { label: "Annpraasan Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Annpraasan%20Welcome%20Boards.", active: false },
  { label: "Babyshower Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Babyshower%20Welcome%20Boards.", active: false },
  { label: "Randal Pooja Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Randal%20Pooja%20Welcome%20Boards.", active: false },
  { label: "Mundan Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Mundan%20Welcome%20Boards.", active: false },
  { label: "Reception Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Reception%20Welcome%20Boards.", active: false },
  { label: "Vastupujan Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Vastupujan%20Welcome%20Boards.", active: false },
  { label: "Ladva Vidhi Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Ladva%20Vidhi%20Welcome%20Boards.", active: false },
  { label: "Kankupagla Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Kankupagla%20Welcome%20Boards.", active: false },
  { label: "Kankotri Lekhan Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Kankotri%20Lekhan%20Welcome%20Boards.", active: false },
  { label: "Panchmasi Welcome Board", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Panchmasi%20Welcome%20Boards.", active: false },
];

const WEDDING_ITINERARY_ITEMS = [
  { label: "Premium Money Envelop", href: "/collections/premium-money-envelop", active: true },
  { label: "Key Holder", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Key%20Holders.", active: false },
  { label: "Tent Card", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Tent%20Cards.", active: false },
  { label: "Luggage Tag", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Luggage%20Tags.", active: false },
  { label: "Seating Tag", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Seating%20Tags.", active: false },
  { label: "Paper Bag", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Paper%20Bags.", active: false },
  { label: "Jute Bag", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Jute%20Bags.", active: false },
  { label: "Tote Bag", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Tote%20Bags.", active: false },
  { label: "Playing Cards", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Playing%20Cards.", active: false },
  { label: "Ritual Cards", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Ritual%20Cards.", active: false },
  { label: "Petal Cone", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Petal%20Cones.", active: false },
  { label: "Stickers", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Stickers.", active: false },
  { label: "Room Hamper Tag", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Room%20Hamper%20Tags.", active: false },
  { label: "Menu Cards", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Menu%20Cards.", active: false },
];

const VIDEO_INVITATION_ITEMS = [
  { label: "Vastupujan Video Invitation", href: "/collections/vastupujan-invitation", active: true },
  { label: "Engagement Video Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Engagement%20Video%20Invitations.", active: false },
  { label: "Wedding Video Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Wedding%20Video%20Invitations.", active: false },
  { label: "Babyshower Video Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Babyshower%20Video%20Invitations.", active: false },
  { label: "Janoi Video Invitation", href: "https://wa.me/917046441356?text=Hi%20Mira%20Cards%2C%20I%27d%20like%20to%20enquire%20about%20Janoi%20Video%20Invitations.", active: false },
];

const DRAWER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections", hasMegaMenu: true, id: "collections" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blog" },
];

function getWhatsappUrl(label: string) {
  const text = `Hi Mira Cards, I would like to inquire about:\n\n` +
               `✨ *Design Details:*\n` +
               `• *Category:* ${label}\n\n` +
               `Looking forward to hearing from you!`;
  return `https://wa.me/917046441356?text=${encodeURIComponent(text)}`;
}

// --- Dynamic nav types ---
interface NavSubCategory { slug: string; name: string; }
interface NavCol { slug: string; title: string; subCategories?: NavSubCategory[]; }
interface NavGrouped {
  "invitation-category": NavCol[];
  "welcome-board": NavCol[];
  "wedding-itinerary": NavCol[];
  "video-invitation": NavCol[];
}
const EMPTY_NAV: NavGrouped = {
  "invitation-category": [],
  "welcome-board": [],
  "wedding-itinerary": [],
  "video-invitation": [],
};

// Static supplemental WhatsApp-only items per column
const STATIC_COL_ITEMS: Record<string, string[]> = {
  "invitation-category": [
    "Grand Opening Invitation","Bhagwat Katha Invitation","Shiv Katha Invitation",
    "Satyanarayan Katha Invitation","Randal Pooja Invitation","Janoi / Upnayan / Yagnopavit",
    "Annpraasan Invitation","Birthday Invitation","Kankupagla","Ladva Vidhi","Mamera",
    "Mundan Ceremony","Naming Ceremony","Punytithi Poster","Reception Invitation",
    "Vastu Pujan","Retirement Invitation Card",
  ],
  "welcome-board": [
    "Wedding Welcome Board","Haldi Welcome Board","Mehendi Welcome Board","Sangeet Welcome Board",
    "Engagement Welcome Board","Mandap Welcome Board","Janoi Welcome Board","Annpraasan Welcome Board",
    "Babyshower Welcome Board","Randal Pooja Welcome Board","Mundan Welcome Board","Reception Welcome Board",
    "Vastupujan Welcome Board","Ladva Vidhi Welcome Board","Kankupagla Welcome Board",
    "Kankotri Lekhan Welcome Board","Panchmasi Welcome Board",
  ],
  "wedding-itinerary": [
    "Key Holder","Tent Card","Luggage Tag","Seating Tag","Paper Bag","Jute Bag",
    "Tote Bag","Playing Cards","Ritual Cards","Petal Cone","Stickers","Room Hamper Tag","Menu Cards",
  ],
  "video-invitation": [
    "Engagement Video Invitation","Wedding Video Invitation",
    "Babyshower Video Invitation","Janoi Video Invitation",
  ],
};

const COL_CONFIG = [
  { key: "invitation-category" as const, heading: "Invitation Category" },
  { key: "welcome-board" as const, heading: "Welcome Board" },
  { key: "wedding-itinerary" as const, heading: "Wedding Itinerary" },
  { key: "video-invitation" as const, heading: "Video Invitation" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [activeMegaMenu, setActiveMegaMenu] = useState<"collections" | "invitations" | "digital" | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<"collections" | "invitations" | "digital" | null>(null);

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [navCollections, setNavCollections] = useState<NavGrouped>(EMPTY_NAV);

  const navRef = useRef<HTMLElement>(null);

  // Fetch nav collections from DB once on mount
  useEffect(() => {
    fetch("/api/collections/nav")
      .then(r => r.json())
      .then(d => { if (d.grouped) setNavCollections(d.grouped); })
      .catch(() => {});
  }, []);

  // Monitor scroll for sticky behavior
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when menu drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Helpers for hover styling
  const getLinkColor = (label: string, href: string) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    if (
      hoveredLink === label ||
      isActive ||
      (label === "Collections" && activeMegaMenu === "collections") ||
      (label === "Wedding Invitations" && activeMegaMenu === "invitations") ||
      (label === "Digital Invitations" && activeMegaMenu === "digital")
    ) {
      return "#C9A227"; // Luxury Gold
    }
    return theme === "dark" ? "#FFFFFF" : "#1B1B1B";
  };

  const getActionColor = (actionName: string) => {
    if (hoveredAction === actionName) {
      return "#C9A227"; // Luxury Gold
    }
    return theme === "dark" ? "#FFFFFF" : "#1B1B1B";
  };

  return (
    <>
      {/* Spacer to prevent layout shift under fixed navbar */}
      <div
        className={`navbar-spacer ${scrolled ? "scrolled" : ""}`}
        style={{
          transition: "height 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        className={`luxury-navbar ${scrolled ? "scrolled" : ""}`}
        style={{
          position: scrolled ? "fixed" : "absolute",
          top: scrolled ? "0" : "44px", // sits below 44px announcement bar
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          zIndex: 90,
          transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          backgroundColor: scrolled
            ? "var(--glass-bg)"
            : "rgba(255, 255, 255, 0.06)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          borderBottom: scrolled
            ? "1px solid var(--glass-border)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: scrolled ? "0 8px 32px 0 rgba(11, 29, 58, 0.04)" : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
            paddingLeft: "clamp(20px, 4vw, 80px)",
            paddingRight: "clamp(20px, 4vw, 80px)",
            position: "relative",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            {/* Left Brand: Pure Text Cursive Signature Logo */}
            <Link
              href="/"
              aria-label="Miracards.in Home"
              style={{
                textDecoration: "none",
                marginRight: "clamp(12px,1.5vw,32px)",
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-signature)",
                  fontSize: scrolled
                    ? "clamp(24px, 3.2vw, 34px)"
                    : "clamp(30px, 4.2vw, 42px)",
                  fontWeight: 200,
                  color: theme === "dark" ? "#FFFFFF" : "#0B1D3A",
                  transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Miracards.in
              </span>
            </Link>

            {/* Desktop Navigation (Center Links) */}
            <div
              className="hidden lg:flex"
              style={{
                alignItems: "center",
                gap: "clamp(18px,1.8vw,40px)",
                height: "100%",
                flex: 1,
                overflow: "hidden",
              }}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              {LINKS.map((link) => {
                const isMega = !!link.hasMegaMenu;
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <div
                    key={link.label}
                    style={{ position: "static", height: "100%", display: "flex", alignItems: "center" }}
                    onMouseEnter={() => {
                      if (isMega) {
                        setActiveMegaMenu(link.id as "collections" | "invitations" | "digital");
                      } else {
                        setActiveMegaMenu(null);
                      }
                      setHoveredLink(link.label);
                    }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        letterSpacing: "0.2px",
                        color: getLinkColor(link.label, link.href),
                        textDecoration: "none",
                        padding: "1rem 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        position: "relative",
                        transition: "color 300ms ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {link.label}
                      {isMega && (
                        <ChevronDown
                          size={13}
                          strokeWidth={2.5}
                          style={{
                            transform:
                              activeMegaMenu === link.id
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 300ms ease",
                          }}
                        />
                      )}


                    </Link>
                  </div>
                );
              })}

              {/* Collections Mega Menu Dropdown */}
              {activeMegaMenu === "collections" && (
                <div
                  style={{
                    position: "absolute",
                    top: scrolled ? "72px" : "96px",
                    left: "1.5rem",
                    right: "1.5rem",
                    borderRadius: "24px",
                    padding: "2.5rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "2rem",
                    zIndex: 9999,
                    backgroundColor: theme === "dark" ? "rgba(10, 25, 47, 0.99)" : "rgba(253, 251, 247, 0.99)",
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                    border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(27, 27, 27, 0.06)",
                    boxShadow: theme === "dark" ? "0 30px 60px rgba(0,0,0,0.6)" : "0 30px 60px rgba(11, 29, 58, 0.15)",
                    animation: "fade-up 300ms cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                  onMouseEnter={() => setActiveMegaMenu("collections")}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  {/* Dynamic columns from DB + static WhatsApp items */}
                  {COL_CONFIG.map(col => (
                    <div key={col.key}>
                      <h3
                        style={{
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          color: "var(--gold)",
                          textTransform: "uppercase",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {col.heading}
                      </h3>
                      {(() => {
                          // Build column-wide sets of all DB collection titles + subcategory names
                          // so static WhatsApp items are never shown for something that has a DB collection
                          const allDbTitles = new Set(
                            navCollections[col.key].map((c: NavCol) => c.title.toLowerCase())
                          );
                          const allDbSubNames = new Set(
                            navCollections[col.key].flatMap((c: NavCol) =>
                              (c.subCategories || []).flatMap(s => [
                                s.name.toLowerCase(),
                                `${s.name.toLowerCase()} welcome board`,
                                `${s.name.toLowerCase()} invitation`,
                              ])
                            )
                          );

                          // Column-wide remaining static items (not covered by any DB collection or subcategory)
                          const columnRemainingStatic = STATIC_COL_ITEMS[col.key].filter(label => {
                            const l = label.toLowerCase();
                            return (
                              !allDbTitles.has(l) &&
                              !allDbSubNames.has(l) &&
                              !allDbSubNames.has(l.replace(/ welcome board$/i, "")) &&
                              !allDbSubNames.has(l.replace(/ invitation$/i, ""))
                            );
                          });

                          return (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", maxHeight: "380px", overflowY: "auto", paddingRight: "0.5rem" }}>
                              {navCollections[col.key].map((dbCol: NavCol) => {
                                const hasSubCats = (dbCol.subCategories || []).length > 0;
                                // For welcome-board: hide the parent collection title link since
                                // the column heading already conveys "Welcome Board"
                                const hideParentLink = col.key === "welcome-board" && hasSubCats;
                                return (
                                  <React.Fragment key={dbCol.slug}>
                                    {!hideParentLink && (
                                      <Link
                                        href={`/collections/${dbCol.slug}`}
                                        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "13.5px", fontWeight: 600, color: "var(--gold)", textDecoration: "none", display: "inline-block", transition: "all 200ms ease", marginTop: "2px" }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold-hover)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.transform = "translateX(0)"; }}
                                      >
                                        {dbCol.title}
                                      </Link>
                                    )}
                                    {(dbCol.subCategories || []).map((sub) => (
                                      <Link
                                        key={sub.slug}
                                        href={`/collections/${dbCol.slug}?subCategory=${encodeURIComponent(sub.name)}`}
                                        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "13px", fontWeight: 400, color: theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(11, 29, 58, 0.85)", textDecoration: "none", display: "inline-block", paddingLeft: col.key === "welcome-board" ? "0" : "8px", transition: "all 200ms ease" }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(11, 29, 58, 0.85)"; e.currentTarget.style.transform = "translateX(0)"; }}
                                      >
                                        {sub.name} {dbCol.slug === "welcome-boards" ? "Welcome Board" : ""}
                                      </Link>
                                    ))}
                                  </React.Fragment>
                                );
                              })}

                              {/* Static WhatsApp-only items not covered by any DB collection */}
                              {(navCollections[col.key].length === 0
                                ? STATIC_COL_ITEMS[col.key]
                                : columnRemainingStatic
                              ).map((label: string) => (
                                <a
                                  key={label}
                                  href={getWhatsappUrl(label)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "13px", fontWeight: 400, color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(11, 29, 58, 0.6)", textDecoration: "none", display: "inline-block", transition: "all 200ms ease" }}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(11, 29, 58, 0.6)"; e.currentTarget.style.transform = "translateX(0)"; }}
                                >
                                  {label} <span style={{ fontSize: "8px", opacity: 0.8, marginLeft: "4px", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(11,29,58,0.2)"}`, borderRadius: "3px", padding: "1px 4px", textTransform: "uppercase" }}>Inquire</span>
                                </a>
                              ))}
                            </div>
                          );
                        })()}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Controls Area */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,1vw,16px)", flexShrink: 0 }}>
              {/* Theme Toggle (Animated Moon transforms into Sun with 400ms transition) */}
              <button
                onClick={toggleTheme}
                onMouseEnter={() => setHoveredAction("theme")}
                onMouseLeave={() => setHoveredAction(null)}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  position: "relative",
                  color: getActionColor("theme"),
                  transition: "color 300ms ease",
                }}
              >
                <div style={{ position: "relative", width: "20px", height: "20px" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
                      opacity: theme === "light" ? 1 : 0,
                      transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Moon size={20} strokeWidth={1.5} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
                      opacity: theme === "dark" ? 1 : 0,
                      transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Sun size={20} strokeWidth={1.5} />
                  </div>
                </div>
              </button>

              <Link
                href="/contact"
                onMouseEnter={() => setIsCtaHovered(true)}
                onMouseLeave={() => setIsCtaHovered(false)}
                className={`nav-cta-btn ${scrolled ? "scrolled" : ""}`}
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  backgroundColor: isCtaHovered ? "#A88414" : "#C9A227",
                  borderRadius: "999px",
                  alignItems: "center",
                  gap: "0.4rem",
                  textDecoration: "none",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  boxShadow: isCtaHovered
                    ? "0 10px 25px rgba(201, 162, 39, 0.45)"
                    : "0 4px 12px rgba(201, 162, 39, 0.15)",
                  transform: isCtaHovered ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Show short label on lg (1024-1279px), full label on xl+ */}
                <span className="cta-short hidden xl:inline">Get Personalized Quote</span>
                <span className="cta-short inline xl:hidden">Get Quote</span>
                <ArrowRight
                  size={13}
                  style={{
                    transform: isCtaHovered ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 200ms ease",
                    flexShrink: 0,
                  }}
                />
              </Link>

              {/* Hamburger — hidden on lg+ (desktop shows full nav links) */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                className="hamburger-btn lg:hidden"
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#0B1D3A",
                }}
              >
                <div className="hamburger-box">
                  <span className={`hamburger-line line-top ${mobileOpen ? "active" : ""}`} />
                  <span className={`hamburger-line line-middle ${mobileOpen ? "active" : ""}`} />
                  <span className={`hamburger-line line-bottom ${mobileOpen ? "active" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Styled JSX for Premium Hamburger Menu & Responsive Drawer */}
      <style>{`
        /* Responsive navbar and spacer heights */
        .luxury-navbar, .navbar-spacer {
          height: 72px !important;
          transition: height 300ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .luxury-navbar.scrolled, .navbar-spacer.scrolled {
          height: 64px !important;
        }
        
        @media (min-width: 1024px) {
          .luxury-navbar, .navbar-spacer {
            height: 96px !important;
          }
          .luxury-navbar.scrolled, .navbar-spacer.scrolled {
            height: 72px !important;
          }
        }

        /* Responsive CTA Button */
        .nav-cta-btn {
          display: none !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
        }
        @media (min-width: 1024px) {
          .nav-cta-btn {
            display: inline-flex !important;
            height: 44px !important;
            padding: 0 18px !important;
            font-size: 11.5px !important;
            white-space: nowrap !important;
          }
          .nav-cta-btn.scrolled {
            height: 40px !important;
            padding: 0 16px !important;
          }
        }
        @media (min-width: 1280px) {
          .nav-cta-btn {
            height: 50px !important;
            padding: 0 26px !important;
            font-size: 12.5px !important;
          }
          .nav-cta-btn.scrolled {
            height: 44px !important;
            padding: 0 22px !important;
          }
        }
        @media (min-width: 1440px) {
          .nav-cta-btn {
            height: 56px !important;
            padding: 0 34px !important;
            font-size: 13px !important;
          }
          .nav-cta-btn.scrolled {
            height: 46px !important;
            padding: 0 26px !important;
          }
        }

        /* Hamburger button animations */
        .hamburger-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          outline: none;
          position: relative;
          transition: transform 300ms ease-out, color 300ms ease-out;
        }
        @media (min-width: 1024px) {
          .hamburger-btn { display: none !important; }
        }
        .hamburger-btn:hover {
          transform: scale(1.05);
          color: #C9A227 !important;
        }
        .hamburger-box {
          width: 24px;
          height: 18px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hamburger-line {
          width: 24px;
          height: 2px;
          background-color: currentColor;
          border-radius: 99px;
          transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1),
                      width 350ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 350ms cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
          position: absolute;
          left: 0;
        }
        .line-top { top: 0; }
        .line-middle { top: 8px; }
        .line-bottom { top: 16px; }

        .hamburger-btn:hover .line-top:not(.active) { transform: translateX(3px); }
        .hamburger-btn:hover .line-middle:not(.active) { width: 16px; }
        .hamburger-btn:hover .line-bottom:not(.active) { transform: translateX(-3px); }

        .line-top.active { transform: translateY(8px) rotate(45deg); }
        .line-middle.active { opacity: 0; width: 0; }
        .line-bottom.active { transform: translateY(-8px) rotate(-45deg); }

        /* Responsive Drawer Layouts */
        @media (min-width: 1440px) {
          .luxury-drawer {
            width: 100vw !important;
            max-width: 100vw !important;
          }
          .luxury-drawer-content {
            display: grid !important;
            grid-template-columns: 45fr 55fr !important;
            height: 100% !important;
            padding: 0 !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1439px) {
          .luxury-drawer {
            width: 420px !important;
            max-width: 420px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .luxury-drawer {
            width: 420px !important;
            max-width: 420px !important;
          }
        }
        @media (max-width: 767px) {
          .luxury-drawer {
            width: 100vw !important;
            max-width: 100vw !important;
          }
        }
      `}</style>

      {/* Fullscreen Mobile/Tablet Navigation Drawer (with smooth slide & opacity transition) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 150,
          background: "rgba(11, 29, 58, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          justifyContent: "flex-end",
          opacity: mobileOpen ? 1 : 0,
          visibility: mobileOpen ? "visible" : "hidden",
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 400ms ease, visibility 400ms ease",
        }}
        onClick={() => setMobileOpen(false)}
      >
        {/* Drawer Body (slides in from right or fills screen) */}
        <div
          className="luxury-drawer"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative",
            backgroundColor: theme === "dark" ? "rgba(10, 25, 47, 0.99)" : "rgba(253, 251, 247, 0.99)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="luxury-drawer-content"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Left Monogram / Monomark area - only visible on Desktop >= 1440px */}
            <div className="hidden xl:flex flex-col justify-between p-16 bg-[#F5F2EC] dark:bg-[#0e2035] h-full border-r border-[#E7DFD4]/30 dark:border-[#21405f]/30">
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-alt), system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--gold)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  MIRA CARDS STUDIO
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "2.75rem",
                    fontWeight: 300,
                    color: theme === "dark" ? "#FFFFFF" : "#0B1D3A",
                    lineHeight: 1.25,
                    marginBottom: "1.5rem",
                  }}
                >
                  Crafting Timeless
                  <br />
                  Celebrations
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: theme === "dark" ? "#bfc7d4" : "#5F5F5F",
                    maxWidth: "340px",
                  }}
                >
                  Handcrafted luxury invitations designed uniquely to reflect your love, culture, and wedding celebration.
                </p>
              </div>
              
              {/* Monogram or Brand Motif */}
              <div style={{ width: "160px", height: "160px", opacity: 0.15, margin: "2rem 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{
                  fontFamily: "var(--font-signature)",
                  fontSize: "120px",
                  fontWeight: 200,
                  color: theme === "dark" ? "#FFFFFF" : "#0B1D3A",
                  lineHeight: 1,
                  userSelect: "none",
                }}>
                  M
                </span>
              </div>

              {/* Brand Info */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: theme === "dark" ? "#6a8099" : "#9a9a9a",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  © {new Date().getFullYear()} Mira Cards Studio. All rights reserved.
                </span>
              </div>
            </div>

            {/* Right Navigation links scrollable area */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "2.5rem",
                justifyContent: "space-between",
                overflowY: "auto",
                height: "100%",
              }}
            >
              {/* Drawer Header with Title and X button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "2.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-signature)",
                    fontSize: "30px",
                    fontWeight: 200,
                    color: theme === "dark" ? "#FFFFFF" : "#0B1D3A",
                  }}
                >
                  Miracards.in
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: theme === "dark" ? "#FFFFFF" : "#1B1B1B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    transition: "background-color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links Stack */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "auto" }}>
                {DRAWER_LINKS.map((link) => {
                  const isMega = !!link.hasMegaMenu;

                  if (isMega) {
                    const menuId = link.id as "collections";
                    const isExpanded = expandedMobileMenu === menuId;
                    const submenuLinks = COLLECTIONS_LINKS;

                    return (
                      <div
                        key={link.label}
                        style={{ borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}` }}
                      >
                        <button
                          onClick={() => setExpandedMobileMenu(isExpanded ? null : menuId)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "0.5rem 0",
                            fontFamily: "var(--font-heading), Playfair Display, Georgia, serif",
                            fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
                            fontWeight: 400,
                            background: "none",
                            border: "none",
                            textAlign: "left",
                            cursor: "pointer",
                            color: theme === "dark" ? "#FFFFFF" : "#1B1B1B",
                          }}
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            style={{
                              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 250ms ease",
                              color: "var(--gold)",
                            }}
                          />
                        </button>

                        {/* Accordion Expandable Sub-items */}
                        <div
                          style={{
                            maxHeight: isExpanded ? "400px" : "0px",
                            overflow: "hidden",
                            transition: "max-height 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                            paddingLeft: "1.25rem",
                          }}
                        >
                          {submenuLinks.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="mobile-sub-link"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        padding: "0.5rem 0",
                        fontFamily: "var(--font-heading), Playfair Display, Georgia, serif",
                        fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
                        fontWeight: 400,
                        color: theme === "dark" ? "#FFFFFF" : "#1B1B1B",
                        textDecoration: "none",
                        borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Foot / CTAs */}
              <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Get Quote Capsule CTA */}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    backgroundColor: "#C9A227",
                    borderRadius: "999px",
                    height: "54px",
                    textDecoration: "none",
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(201,162,39,0.15)",
                    transition: "background-color 200ms ease",
                  }}
                >
                  Get Personalized Quote
                  <ArrowRight size={14} />
                </Link>

                {/* WhatsApp Consultation Link */}
                <a
                  href={`https://wa.me/917046441356?text=${encodeURIComponent(
                    `Hi Mira Cards, I would like to inquire about your luxury wedding invitation services.\n\n` +
                    `Looking forward to hearing from you!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: theme === "dark" ? "#FFFFFF" : "#0B1D3A",
                    backgroundColor: "transparent",
                    border: `1.5px solid ${theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(11,29,58,0.2)"}`,
                    borderRadius: "999px",
                    height: "54px",
                    textDecoration: "none",
                    textAlign: "center",
                    transition: "all 200ms ease",
                  }}
                >
                  <WhatsAppIcon size={18} style={{ color: "#25D366" }} />
                  WhatsApp Consultation
                </a>

                {/* Dark Mode Toggle Inline Row (Mobile & Drawer toggle option) */}
                <button
                  onClick={toggleTheme}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: theme === "dark" ? "#FFFFFF" : "#1B1B1B",
                    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                    borderRadius: "999px",
                    height: "48px",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    transition: "all 200ms ease",
                  }}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  <span>Toggle Dark Mode</span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}
