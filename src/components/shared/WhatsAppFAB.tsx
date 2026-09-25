"use client";

import WhatsAppIcon from "./WhatsAppIcon";

const WHATSAPP_NUMBER = "917046441356";
const DEFAULT_MESSAGE =
  "Hi Mira Cards, I'd like to enquire about luxury wedding invitations. Could you help me?";

export default function WhatsAppFAB() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      id="whatsapp-fab"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 40,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "#25D366",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 8px 32px rgba(37,211,102,0.45)",
        transition: "all var(--transition-base)",
        animation: "pulse-gold 3s ease-in-out infinite",
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(37,211,102,0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,211,102,0.45)";
      }}
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}
