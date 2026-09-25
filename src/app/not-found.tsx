"use client";

import Link from "next/link";
import { useTheme } from "@/components/shared/ThemeProvider";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "550px" }}>
        {/* Logo/Monogram placeholder or text */}
        <span
          style={{
            fontFamily: "var(--font-signature), cursive",
            fontSize: "2.5rem",
            color: "var(--gold)",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          Mira Cards
        </span>

        {/* Large 404 numbers */}
        <h1
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: "7rem",
            fontWeight: 300,
            color: "var(--text)",
            margin: "0 0 1rem 0",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          404
        </h1>

        {/* Page Not Found label */}
        <h2
          style={{
            fontFamily: "var(--font-alt), sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold)",
            margin: "0 0 1.5rem 0",
          }}
        >
          Page Not Found
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.9375rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
            margin: "0 0 2.5rem 0",
          }}
        >
          The page you are looking for does not exist, has been archived, or was moved. We invite you to return to our homepage or browse our wedding card collections.
        </p>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Home button */}
          <Link
            href="/"
            className="btn"
            style={{
              backgroundColor: "var(--color-blue-primary)",
              color: "#ffffff",
              borderRadius: "4px",
              padding: "0.875rem 2rem",
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-blue-secondary)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-blue-primary)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Home size={14} /> Go Home
          </Link>

          {/* Collections button */}
          <Link
            href="/collections"
            className="btn"
            style={{
              backgroundColor: "transparent",
              color: "var(--text)",
              border: `1.5px solid ${dk ? "rgba(255,255,255,0.15)" : "rgba(11,29,58,0.15)"}`,
              borderRadius: "4px",
              padding: "0.875rem 2rem",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textTransform: "uppercase",
              transition: "all 300ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = dk ? "rgba(255,255,255,0.15)" : "rgba(11,29,58,0.15)";
              e.currentTarget.style.color = "var(--text)";
            }}
          >
            Our Collections <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
