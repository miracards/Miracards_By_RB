"use client";

import { usePathname } from "next/navigation";
import WhatsAppIcon from "./WhatsAppIcon";

const WHATSAPP_NUMBER = "917046441356";
const DEFAULT_MESSAGE =
  "Hi Mira Cards, I'd like to enquire about luxury wedding invitations. Could you help me?";

export default function WhatsAppFAB() {
  const pathname = usePathname();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  if (pathname === "/") return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      id="whatsapp-fab"
      style={{
        position: "fixed",
        right: "calc(1rem + env(safe-area-inset-right))",
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
        zIndex: 50,
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "linear-gradient(180deg, #1bdc5b 0%, #18a54a 100%)",
        color: "#ffffff",
        textDecoration: "none",
        boxShadow: "0 12px 28px rgba(37, 211, 102, 0.38)",
        border: "3px solid rgba(255,255,255,0.7)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.04)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 34px rgba(37, 211, 102, 0.48)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 28px rgba(37, 211, 102, 0.38)";
      }}
    >
      <WhatsAppIcon size={26} color="#ffffff" aria-hidden="true" />
    </a>
  );
}
