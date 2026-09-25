"use client";

import Link from "next/link";
import { ArrowRight, Search, FileText, FileCheck, MessageCircle, ThumbsUp, Printer, CheckCircle } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Choose Your Design",
    icon: <Search size={18} strokeWidth={1.5} />,
  },
  {
    num: "02",
    title: "Share Your Requirements",
    icon: <FileText size={18} strokeWidth={1.5} />,
  },
  {
    num: "03",
    title: "Receive Your Personalized Quote",
    icon: <FileCheck size={18} strokeWidth={1.5} />,
  },
  {
    num: "04",
    title: "Design Discussion",
    icon: <MessageCircle size={18} strokeWidth={1.5} />,
  },
  {
    num: "05",
    title: "Design Approval",
    icon: <ThumbsUp size={18} strokeWidth={1.5} />,
  },
  {
    num: "06",
    title: "Printing & Finishing",
    icon: <Printer size={18} strokeWidth={1.5} />,
  },
  {
    num: "07",
    title: "Quality Check & Delivery",
    icon: <CheckCircle size={18} strokeWidth={1.5} />,
  },
];

export default function ProcessSection() {
  return (
    <section className="section" style={{ background: "var(--bg)", padding: "7rem 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
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
            Our Simple Design Process
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "2.5rem",
              fontWeight: 300,
              color: "var(--text)",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            Crafted with Care, Delivered with Love
          </h2>
        </div>

        {/* Timeline Container */}
        <div style={{ position: "relative", marginBottom: "5rem" }}>
          {/* Horizontal/Vertical connecting dashed line */}
          <div className="process-connecting-line" />

          {/* Steps list container */}
          <div className="process-timeline-container">
            {STEPS.map((step) => (
              <div key={step.num} className="process-step-item">
                {/* Node circle */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.2px solid var(--gold)",
                    background: "var(--bg-card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    flexShrink: 0,
                    transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "0 4px 12px rgba(201, 162, 39, 0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.15)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(201, 162, 39, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(201, 162, 39, 0.04)";
                  }}
                >
                  {step.icon}
                </div>

                {/* Info Text wrapper */}
                <div style={{ padding: "0 0.25rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-alt), sans-serif",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: "var(--gold)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Step {step.num}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "0.9375rem",
                      fontWeight: 400,
                      color: "var(--text)",
                      lineHeight: 1.35,
                      margin: 0,
                      maxWidth: "140px",
                    }}
                  >
                    {step.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/contact"
            className="btn"
            style={{
              backgroundColor: "var(--color-blue-primary)",
              color: "#ffffff",
              borderRadius: "4px",
              padding: "1rem 2.5rem",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              textTransform: "uppercase",
              border: "none",
              boxShadow: "0 4px 12px rgba(11, 29, 58, 0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-blue-secondary)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(11, 29, 58, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-blue-primary)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(11, 29, 58, 0.15)";
            }}
          >
            Start Your Journey <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
