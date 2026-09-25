"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/shared/ThemeProvider";
import { RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const { theme } = useTheme();
  const dk = theme === "dark";

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error boundary triggered:", error);
  }, [error]);

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

        {/* Header */}
        <h1
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "var(--text)",
            margin: "0 0 1rem 0",
            lineHeight: 1.1,
          }}
        >
          Something Went Wrong
        </h1>

        {/* Luxury Label */}
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
          Unexpected Error Occurred
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
          An unexpected error occurred while loading this page. Our team is actively reviewing the logs. Please try again or return to our homepage.
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
          {/* Reset button */}
          <button
            onClick={() => reset()}
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
              cursor: "pointer",
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
            <RefreshCw size={14} /> Try Again
          </button>

          {/* Home button */}
          <Link
            href="/"
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
            <Home size={14} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
