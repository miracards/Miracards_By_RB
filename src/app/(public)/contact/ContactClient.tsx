"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import CustomSelect from "@/components/shared/CustomSelect";

export default function ContactClient() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    guestCount: "",
    cardCount: "",
    collectionInterest: "General Inquiry",
    requirements: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Set default selection if query params exist
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const interest = params.get("interest");
      if (interest) {
        setFormData((prev) => ({ ...prev, collectionInterest: interest }));
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const d = await res.json();
        setSubmitError(d.error ?? "Failed to submit. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header Block */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#C9A227",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Bespoke Consultation
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700,
              marginBottom: "18px",
              lineHeight: 1.15,
            }}
          >
            Begin Your Story
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "16px",
              color: dk ? "#d0dae6" : "#5F5F5F",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            We invite you to share details of your celebration. Our design experts will craft
            custom wedding stationery that honors your vision and heritage.
          </p>
        </div>

        {/* Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1.8fr",
            gap: "50px",
          }}
          className="contact-layout"
        >
          <style>{`
            @media (max-width: 991px) {
              .contact-layout {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
              }
            }
          `}</style>

          {/* Column 1: Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Quick Contact Box */}
            <div
              className="glass-ios"
              style={{
                borderRadius: "24px",
                padding: "36px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 600,
                  marginBottom: "24px",
                }}
              >
                Studio Contacts
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {[
                  {
                    icon: <Phone size={18} color="#C9A227" />,
                    title: "Call Us",
                    value: "+91 70464 41356",
                    href: "tel:+917046441356",
                  },
                  {
                    icon: <WhatsAppIcon size={18} color="#C9A227" />,
                    title: "WhatsApp",
                    value: "+91 70464 41356",
                    href: "https://wa.me/917046441356",
                  },
                  {
                    icon: <Mail size={18} color="#C9A227" />,
                    title: "Email Inquiries",
                    value: "miracards.in@gmail.com",
                    href: "mailto:miracards.in@gmail.com",
                  },
                  {
                    icon: <MapPin size={18} color="#C9A227" />,
                    title: "Design Studio",
                    value: "Gujarat, India",
                    href: "#",
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: dk ? "rgba(201,162,39,0.08)" : "rgba(201,162,39,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: dk ? "#A0AEC0" : "#718096",
                          display: "block",
                          marginBottom: "4px",
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </span>
                      {item.href !== "#" ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "15px",
                            fontWeight: 500,
                            color: dk ? "#FFFFFF" : "#0B1D3A",
                            textDecoration: "none",
                            borderBottom: "1px dashed transparent",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "#C9A227")}
                          onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ fontSize: "15px", fontWeight: 500 }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Locations Box */}
            <div
              className="glass-ios"
              style={{
                borderRadius: "24px",
                padding: "36px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 600,
                  marginBottom: "24px",
                }}
              >
                Our Locations
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {[
                  {
                    name: "Head Office (Ahmedabad)",
                    address: "3rd floor, 349, Yash Arian Complex, Nr. Swami Vivekanand Cir, Memnagar, Ahmedabad, Gujarat 380052",
                    phones: [
                      { label: "India", value: "+91 70464 41356", href: "tel:+917046441356" },
                      { label: "UK", value: "+44 7758 157357", href: "tel:+447758157357" }
                    ]
                  },
                  {
                    name: "Surat Branch",
                    address: "874, Old G.I.D.C, Fulpada Road, Katargam, Surat, Gujarat, 395004",
                    phones: [
                      { label: "Phone", value: "+91 89052 03703", href: "tel:+918905203703" }
                    ]
                  },
                  {
                    name: "Bhuj Branch",
                    address: "1, 1st Floor, JV Square, above Yamaha Showroom, Sanskar Nagar, Bhuj, Gujarat 370001",
                    phones: [
                      { label: "Phone", value: "+91 80008 00248", href: "tel:+918000800248" }
                    ]
                  },
                  {
                    name: "United Kingdom (UK)",
                    address: "37 Woodfield Avenue, Ha0 3np",
                    phones: [
                      { label: "WhatsApp", value: "+44 7758 157357", href: "https://wa.me/447758157357" }
                    ]
                  },
                  {
                    name: "United States (USA)",
                    address: "Westjeaven, USA",
                    phones: [
                      { label: "WhatsApp", value: "+1 (562) 843-7710", href: "https://wa.me/15628437710" }
                    ]
                  }
                ].map((branch, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <h4
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#C9A227",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {branch.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.5,
                        color: dk ? "#d0dae6" : "#a0aec5",
                      }}
                    >
                      {branch.address}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "4px" }}>
                      {branch.phones.map((p, pIdx) => (
                        <a
                          key={pIdx}
                          href={p.href}
                          target={p.href.startsWith("http") ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: dk ? "#FFFFFF" : "#0B1D3A",
                            textDecoration: "none",
                            background: dk ? "rgba(255,255,255,0.05)" : "rgba(11,29,58,0.03)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = dk ? "rgba(201,162,39,0.2)" : "rgba(201,162,39,0.1)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = dk ? "rgba(255,255,255,0.05)" : "rgba(11,29,58,0.03)")}
                        >
                          <span style={{ opacity: 0.6, fontSize: "10px", textTransform: "uppercase" }}>{p.label}:</span>
                          {p.value}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote watermark note */}
            <div
              style={{
                borderLeft: "2px solid #C9A227",
                paddingLeft: "20px",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                lineHeight: 1.6,
                color: dk ? "#A0AEC0" : "#718096",
              }}
            >
              <strong>Bespoke Customization</strong>: We offer customization for all cultures, religions,
              and design requirements. From handmade board-invitations with hot foil printing to digital suites, we support your unique style.
            </div>
          </div>

          {/* Column 2: Form */}
          <div
            className="glass-ios"
            style={{
              borderRadius: "24px",
              padding: "40px",
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(201,162,39,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <Send size={32} color="#C9A227" />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                    fontSize: "26px",
                    fontWeight: 600,
                    marginBottom: "12px",
                  }}
                >
                  Inquiry Received
                </h3>
                <p style={{ fontSize: "15px", color: dk ? "#A0AEC0" : "#5F5F5F", marginBottom: "28px" }}>
                  Thank you for sharing your celebration details. A design consultant will review
                  your requirements and get in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    background: "#C9A227",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "30px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "13px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row-2">
                  <style>{`
                    @media (max-width: 575px) {
                      .form-row-2 {
                        grid-template-columns: 1fr !important;
                      }
                    }
                  `}</style>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Priyank Shah"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "#CBD5E0"}`,
                        background: dk ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                        color: dk ? "#FFFFFF" : "#0B1D3A",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. priyank@example.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "#CBD5E0"}`,
                        background: dk ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                        color: dk ? "#FFFFFF" : "#0B1D3A",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row-2">
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "#CBD5E0"}`,
                        background: dk ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                        color: dk ? "#FFFFFF" : "#0B1D3A",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "#CBD5E0"}`,
                        background: dk ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                        color: dk ? "#FFFFFF" : "#0B1D3A",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr", gap: "20px" }} className="form-row-3">
                  <style>{`
                    @media (max-width: 767px) {
                      .form-row-3 {
                        grid-template-columns: 1fr !important;
                      }
                    }
                  `}</style>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Collection of Interest
                    </label>
                    <CustomSelect
                      options={[
                        { value: "General Inquiry", label: "General Inquiry" },
                        { value: "Royal Invitations", label: "Royal Invitations" },
                        { value: "Box Invitations", label: "Box Invitations" },
                        { value: "Laser Cut Cards", label: "Laser Cut Cards" },
                        { value: "Foil & Embossed", label: "Foil & Embossed" },
                        { value: "Acrylic Cards", label: "Acrylic Cards" },
                        { value: "Digital / Video Invitations", label: "Digital / Video Invitations" },
                      ]}
                      value={formData.collectionInterest}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, collectionInterest: value }))
                      }
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="cardCount"
                      value={formData.cardCount}
                      onChange={handleChange}
                      placeholder="e.g. 200"
                      min="0"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "#CBD5E0"}`,
                        background: dk ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                        color: dk ? "#FFFFFF" : "#0B1D3A",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      placeholder="e.g. 500"
                      min="0"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "#CBD5E0"}`,
                        background: dk ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                        color: dk ? "#FFFFFF" : "#0B1D3A",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Special Requirements
                  </label>
                  <textarea
                    name="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Tell us about your theme, colors, language requirements or customizations..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "#CBD5E0"}`,
                      background: dk ? "rgba(0,0,0,0.2)" : "#FFFFFF",
                      color: dk ? "#FFFFFF" : "#0B1D3A",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                {submitError && (
                  <div style={{ background: "#FFF5F5", border: "1px solid #FED7D7", borderRadius: "8px", padding: "12px 16px", fontSize: "13px", color: "#C53030" }}>
                    ⚠️ {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting ? "#D4B96A" : "#C9A227",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "14px",
                    borderRadius: "30px",
                    fontWeight: 700,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontSize: "13px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 4px 14px rgba(201,162,39,0.2)",
                    transition: "all 0.3s",
                    opacity: isSubmitting ? 0.8 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) { e.currentTarget.style.backgroundColor = "#A88414"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(201,162,39,0.3)"; }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) { e.currentTarget.style.backgroundColor = "#C9A227"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(201,162,39,0.2)"; }
                  }}
                >
                  {isSubmitting ? "Submitting…" : "Submit Inquiry"}
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
