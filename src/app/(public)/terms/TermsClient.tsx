"use client";

import React from "react";
import { useTheme } from "@/components/shared/ThemeProvider";

export default function TermsClient() {
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
          Terms of Service
        </h1>
        
        <p style={{ fontSize: "14px", color: dk ? "#A0AEC0" : "#718096", marginBottom: "40px" }}>
          Last Updated: June 27, 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", lineHeight: 1.8, fontSize: "15px" }}>
          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              1. Scope of Service
            </h2>
            <p style={{ color: dk ? "#d0dae6" : "#4A5568" }}>
              Mira Cards provides bespoke wedding invitations and stationary customization services.
              By placing an inquiry or making an order, you agree to submit accurate customer information and design specifications.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              2. Design Approvals & Proofing
            </h2>
            <p style={{ color: dk ? "#d0dae6" : "#4A5568" }}>
              For custom print orders, customers will receive digital proof sheets via email/WhatsApp. It is the customer's
              sole responsibility to verify spelling, layout alignment, dates, names, and event logistics. Once a proof is
              explicitly approved for production, no modifications can be guaranteed, and the customer accepts responsibility
              for printing errors on the approved design template.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              3. Customization & Shipping
            </h2>
            <p style={{ color: dk ? "#d0dae6" : "#4A5568" }}>
              Custom craft stationery production times vary based on the complexity of printing techniques chosen (e.g. laser cutting,
              box fabrication). Shipping dates provided are estimates. Mira Cards is not liable for shipping delays resulting
              from international customs or local courier logistics.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              4. Governing Law
            </h2>
            <p style={{ color: dk ? "#d0dae6" : "#4A5568" }}>
              These Terms of Service shall be governed by and construed in accordance with the laws of India. Any legal dispute
              arising out of or in connection with our products shall be subject to the exclusive jurisdiction of the competent courts of Gujarat, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
