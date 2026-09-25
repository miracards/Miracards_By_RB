"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/shared/ThemeProvider";
import {
  Smartphone,
  Check,
  Calendar,
  ArrowRight,
  MapPin,
  Music,
  Lock,
  Globe,
  ChevronDown,
} from "lucide-react";

interface ThemeExample {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  mockTitle: string;
  mockDate: string;
  mockVenue: string;
}

const THEME_EXAMPLES: ThemeExample[] = [
  {
    id: "royal-heritage",
    name: "Royal Heritage",
    tagline: "Imperial Elegance",
    description: "Deep gold accents, rich textures, and traditional motifs designed for large celebrations.",
    image: "/featured-royal.png",
    features: ["Intricate Gold Borders", "Devanagari/Urdu Typeface Styles", "Pre-wedding Film Section"],
    mockTitle: "Ananya & Rohan",
    mockDate: "December 18, 2026",
    mockVenue: "The Leela Palace, Udaipur",
  },
  {
    id: "gilded-glamour",
    name: "Gilded Glamour",
    tagline: "Modern Luxury",
    description: "Clean serif typography, gold-foil accents, and subtle parallax scrolling effects.",
    image: "/featured-foil.png",
    features: ["Gold Embossed Icons", "Chronological Timeline", "Single-page Parallax Scroll"],
    mockTitle: "Priya & Kunal",
    mockDate: "January 24, 2027",
    mockVenue: "Taj Lands End, Mumbai",
  },
  {
    id: "frosted-modern",
    name: "Frosted Modern",
    tagline: "Sleek & Contemporary",
    description: "Minimalist layout using frosted glass panels, translucent layers, and crisp typography.",
    image: "/featured-acrylic.png",
    features: ["Glassmorphism Cards", "Dark Mode Optimized", "Interactive RSVP Dashboard"],
    mockTitle: "Zayn & Fatima",
    mockDate: "February 12, 2027",
    mockVenue: "ITC Grand Chola, Chennai",
  },
  {
    id: "pastel-garden",
    name: "Pastel Garden",
    tagline: "Romantic & Whimsical",
    description: "Soft watercolor illustrations, botanical borders, and delicate handwritten scripts.",
    image: "/real-wedding-3.png",
    features: ["Custom Flower Animations", "Digital Guest Book", "Dietary Needs Questionnaire"],
    mockTitle: "Meera & Kabir",
    mockDate: "March 08, 2027",
    mockVenue: "Aalia Jungle Retreat, Haridwar",
  },
];

const FAQS = [
  {
    question: "How long does it take to launch our wedding website?",
    answer: "Typically, a website is fully customized, approved, and launched within 7 to 10 business days. If you need it urgently, express delivery (within 3 days) is available.",
  },
  {
    question: "Can we collect custom RSVP information from guests?",
    answer: "Yes, absolutely! We can configure custom questionnaire fields such as: guest names, attendance status, dietary preferences, hotel accommodation needs, and songs they want to hear on the dance floor.",
  },
  {
    question: "Is the domain name customizable?",
    answer: "Yes, all our premium website packages include a custom domain (e.g. www.priyaandrohan.in or www.aditya-rhea.com) valid for 1 year.",
  },
  {
    question: "Can we restrict access to invited guests only?",
    answer: "Yes, we can secure your website with custom password protection so that only family and friends who have the access code can view details and venue maps.",
  },
  {
    question: "How do we receive guest RSVP responses?",
    answer: "You will receive a private real-time dashboard link (Google Sheet or custom dashboard) where all guest RSVPs are compiled. You can also opt-in for real-time email notifications.",
  },
];

export default function WeddingWebsiteClient() {
  const { theme } = useTheme();
  const dk = theme === "dark";
  const [activeTheme, setActiveTheme] = useState<ThemeExample>(THEME_EXAMPLES[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "8rem", paddingBottom: "7rem" }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "5.5rem" }}>
          <span
            style={{
              color: "var(--gold)",
              fontWeight: 600,
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
              fontFamily: "var(--font-alt), sans-serif",
            }}
          >
            Digital Stationery Suites
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            Interactive Wedding Websites
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "0.9375rem",
              color: "var(--text-muted)",
              maxWidth: "650px",
              margin: "0 auto 2.5rem auto",
              lineHeight: 1.6,
            }}
          >
            Bespoke digital companion suites styled in absolute harmony with your physical wedding invitations. Guide your guests with interactive maps, direct RSVP portals, and elegant animated stories.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/contact?interest=Digital / Video Invitations"
              className="btn"
              style={{
                backgroundColor: "var(--color-blue-primary)",
                color: "#ffffff",
                borderRadius: "4px",
                padding: "1rem 2.25rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textTransform: "uppercase",
                transition: "all 300ms ease",
                boxShadow: "0 4px 12px rgba(11,29,58,0.15)",
                border: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-blue-secondary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-blue-primary)"; }}
            >
              Start Website Inquiry <ArrowRight size={14} />
            </Link>
            <a
              href="#themes"
              className="btn"
              style={{
                backgroundColor: "transparent",
                color: "var(--text)",
                border: `1.5px solid ${dk ? "rgba(255,255,255,0.15)" : "rgba(11,29,58,0.15)"}`,
                borderRadius: "4px",
                padding: "1rem 2.25rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textTransform: "uppercase",
                transition: "all 300ms ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = dk ? "rgba(255,255,255,0.15)" : "rgba(11,29,58,0.15)"; e.currentTarget.style.color = "var(--text)"; }}
            >
              View Theme Examples
            </a>
          </div>
        </div>

        {/* Live Interactive Examples Sandbox */}
        <section id="themes" style={{ marginBottom: "7rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-alt), sans-serif",
              }}
            >
              Interactive Preview
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "1.75rem",
                color: "var(--text)",
                margin: 0,
              }}
            >
              Choose a Theme to Preview
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "stretch",
            }}
            className="lg:grid-cols-12"
          >
            {/* Theme Selector list (4 cols) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="lg:col-span-4">
              {THEME_EXAMPLES.map((item) => {
                const isSelected = activeTheme.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveTheme(item)}
                    className="card-glass-ios"
                    style={{
                      border: isSelected ? "1.5px solid var(--gold)" : "1px solid var(--glass-border)",
                      padding: "1.25rem 1.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-alt), sans-serif",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        color: "var(--gold)",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.tagline}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), serif",
                        fontSize: "1.125rem",
                        color: "var(--text)",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Interactive Device Preview (8 cols) */}
            <div
              className="md:grid-cols-2 lg:col-span-8 glass-ios"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "2rem",
                alignItems: "center",
                borderRadius: "24px",
                padding: "2.5rem",
              }}
            >
              {/* Phone Frame Simulator */}
              <div
                style={{
                  width: "270px",
                  height: "530px",
                  borderRadius: "36px",
                  border: `12px solid ${dk ? "#1b2d42" : "#1b1b1b"}`,
                  background: dk ? "#071321" : "#ffffff",
                  position: "relative",
                  margin: "0 auto",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Speaker/Camera notch */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "110px",
                    height: "18px",
                    background: dk ? "#1b2d42" : "#1b1b1b",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    zIndex: 10,
                  }}
                />

                {/* Simulated Web View Container */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
                  {/* Banner Image */}
                  <div style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
                    <Image
                      src={activeTheme.image}
                      alt={activeTheme.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(11,29,58,0.2)" }} />
                  </div>

                  {/* Template Text Content */}
                  <div style={{ padding: "1.5rem", textAlign: "center", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-signature), cursive",
                          fontSize: "24px",
                          color: "var(--gold)",
                          marginBottom: "0.25rem",
                          display: "block",
                        }}
                      >
                        {activeTheme.mockTitle}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          fontFamily: "var(--font-alt)",
                          color: "var(--text)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Are Getting Married
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "10px",
                          color: "var(--text-muted)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {activeTheme.mockDate}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "9px",
                          color: "var(--text-muted)",
                          lineHeight: 1.4,
                        }}
                      >
                        {activeTheme.mockVenue}
                      </div>
                    </div>

                    {/* RSVP Trigger Button */}
                    <div
                      style={{
                        background: "var(--gold)",
                        color: "#ffffff",
                        padding: "8px",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        borderRadius: "20px",
                        textTransform: "uppercase",
                        boxShadow: "0 4px 10px rgba(201,162,39,0.2)",
                      }}
                    >
                      RSVP ONLINE
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme details & inclusions */}
              <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
                <span
                  style={{
                    fontFamily: "var(--font-alt), sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Theme Details
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "1.75rem",
                    color: "var(--text)",
                    margin: "0 0 1rem 0",
                  }}
                >
                  {activeTheme.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                  }}
                >
                  {activeTheme.description}
                </p>

                <div
                  style={{
                    borderTop: `1px solid var(--border-color)`,
                    paddingTop: "1.25rem",
                    marginBottom: "2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-alt), sans-serif",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Included Features
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {activeTheme.features.map((feat, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <Check size={14} color="var(--gold)" strokeWidth={3} />
                        <span style={{ fontSize: "0.8125rem", color: "var(--text)" }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/contact?interest=Digital / Video Invitations&theme=${encodeURIComponent(activeTheme.name)}`}
                  className="btn"
                  style={{
                    backgroundColor: "var(--color-blue-primary)",
                    color: "#ffffff",
                    padding: "0.875rem 2rem",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    borderRadius: "4px",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-blue-secondary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-blue-primary)"; }}
                >
                  Request This Theme
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section style={{ marginBottom: "7rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-alt), sans-serif",
              }}
            >
              Exquisite Features
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "2.25rem",
                fontWeight: 300,
                color: "var(--text)",
                margin: 0,
              }}
            >
              Engineered for Magic
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: <Smartphone size={24} />,
                title: "Flawless Mobile RSVP",
                desc: "An intuitive web interface for guests to search their names, confirm attendance, register group sizes, and state diet specifications.",
              },
              {
                icon: <MapPin size={24} />,
                title: "Smart Venue Maps",
                desc: "Direct navigation markers linked straight to Google Maps & Apple Maps, saving guests from directions confusion on the wedding day.",
              },
              {
                icon: <Calendar size={24} />,
                title: "Calendar Integration",
                desc: "Provide guests with downloadable calendar invites (.ics files) to quickly lock the celebration dates directly into their schedules.",
              },
              {
                icon: <Globe size={24} />,
                title: "Custom Branded Domain",
                desc: "A personalized premium link (e.g. ZaynFatima.wedding) mapping custom browser icons (favicons) for a bespoke touch.",
              },
              {
                icon: <Music size={24} />,
                title: "Background Melodies",
                desc: "Gracefully fade in custom background music (Shehnai, classical strings, or contemporary tracks) to greet your visitors.",
              },
              {
                icon: <Lock size={24} />,
                title: "Private & Secure",
                desc: "Protect guest logs and celebration event codes behind password walls to restrict accessibility from general search engines.",
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="card-glass-ios"
                style={{
                  padding: "2rem",
                }}
              >
                <div style={{ color: "var(--gold)", marginBottom: "1rem" }}>{feat.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "1.25rem",
                    color: "var(--text)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Accordion */}
        <section style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                fontSize: "0.625rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-alt), sans-serif",
              }}
            >
              Common Queries
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "2rem",
                fontWeight: 300,
                color: "var(--text)",
                margin: 0,
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-ios"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "0.5rem",
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      color: "var(--text)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display), serif",
                        fontSize: "1.0625rem",
                        fontWeight: 400,
                      }}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: "var(--gold)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 300ms ease",
                      }}
                    />
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? "300px" : "0",
                      opacity: isOpen ? "1" : "0",
                      overflow: "hidden",
                      transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div
                      style={{
                        padding: "0 1.5rem 1.5rem 1.5rem",
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: "0.875rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
