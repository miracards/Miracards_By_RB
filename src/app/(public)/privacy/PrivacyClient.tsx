"use client";

import React from "react";
import { useTheme } from "@/components/shared/ThemeProvider";

export default function PrivacyClient() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  return (
    <div
      style={{
        background: dk ? "#071321" : "#FCFAF7",
        minHeight: "100vh",
        paddingTop: "clamp(120px, 14vh, 160px)",
        paddingBottom: "80px",
        color: dk ? "#FFFFFF" : "#0B1D3A",
      }}
    >
      <div
        className="glass-ios"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "48px 36px",
          borderRadius: "24px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            marginBottom: "30px",
          }}
        >
          Privacy Policy
        </h1>
        
        <p style={{ fontSize: "14px", color: dk ? "#A0AEC0" : "#718096", marginBottom: "40px" }}>
          Last Updated: June 27, 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", lineHeight: 1.8, fontSize: "15px" }}>
          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              1. Information We Collect
            </h2>
            <p style={{ color: dk ? "#d0dae6" : "#4A5568" }}>
              We collect information you provide directly to us when filling out consultation forms or contacting us.
              This includes your name, email address, phone number, wedding date, expected guest count, card quantity requirements,
              and special theme requirements.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              2. How We Use Your Information
            </h2>
            <p style={{ color: dk ? "#d0dae6" : "#4A5568" }}>
              We use the collected information to:
            </p>
            <ul style={{ paddingLeft: "20px", color: dk ? "#d0dae6" : "#4A5568" }}>
              <li>Generate custom price quotes for your stationery orders.</li>
              <li>Provide personalized design consultations.</li>
              <li>Coordinate shipment of samples or finalized physical products.</li>
              <li>Address customer inquiries and feedback.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              3. Data Security & Storage
            </h2>
            <p style={{ color: dk ? "#d0dae6" : "#4A5568" }}>
              We implement industry-standard security measures to safeguard your personal details and protect them
              against unauthorized access, modification, or disclosure. We do not sell or lease your personal information
              to third parties.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              4. Contact Us
            </h2>
            <p style={{ color: dk ? "#d0dae6" : "#4A5568" }}>
              If you have any questions about this Privacy Policy, you can reach us at <strong>miracards.in@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
