"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, FolderOpen, MessageSquare, Settings,
  LogOut, Sparkles, ChevronRight, Menu, X
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/collections", label: "Collections", icon: FolderOpen },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const GOLD = "#C9A227";
const SIDEBAR_BG = "#FCFAF7";
const TEXT_PRIMARY = "#0B1D3A";
const TEXT_MUTED = "#5F5F5F";
const BORDER = "#E7DFD4";

interface Props {
  user: { name: string; email: string };
}

export default function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const sidebarContent = (
    <div style={{
      width: "260px", height: "100%", background: SIDEBAR_BG,
      borderRight: `1px solid ${BORDER}`,
      display: "flex", flexDirection: "column",
      boxShadow: "2px 0 12px rgba(11,29,58,0.04)",
      paddingBottom: "24px",
    }}>
      {/* Brand */}
      <div style={{ padding: "22px 20px 18px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: `linear-gradient(135deg, ${GOLD}, #E8C547)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 4px 12px rgba(201,162,39,0.25)",
          }}>
            <Sparkles size={18} color="#FFF" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: TEXT_PRIMARY, lineHeight: 1.2 }}>Mira Cards</div>
            <div style={{ fontSize: "11px", color: TEXT_MUTED, fontWeight: 500 }}>Super Admin</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: TEXT_MUTED, padding: "0 8px", marginBottom: "8px" }}>
          Menu
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className={`admin-nav-item ${isActive ? "active" : ""}`} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "10px", marginBottom: "4px",
                background: isActive ? `rgba(201,162,39,0.08)` : "transparent",
                color: isActive ? GOLD : TEXT_MUTED,
                borderLeft: isActive ? `3px solid ${GOLD}` : "3px solid transparent",
                paddingLeft: isActive ? "9px" : "12px",
                transition: "all 0.2s", cursor: "pointer",
              }}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{ fontSize: "14px", fontWeight: isActive ? 600 : 500, flex: 1 }}>{label}</span>
                {isActive && <ChevronRight size={14} />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile + Logout */}
      <div style={{ padding: "16px 12px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 12px", borderRadius: "10px", marginBottom: "8px",
          background: "#F5F2EC",
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${GOLD}, #E8C547)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 700, color: "#FFF", flexShrink: 0,
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: TEXT_PRIMARY, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.name}
            </div>
            <div style={{ fontSize: "11px", color: TEXT_MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.email}
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          style={{
            display: "flex", alignItems: "center", gap: "10px", width: "100%",
            padding: "9px 12px", borderRadius: "10px", background: "none",
            border: "1px solid #FECACA", color: "#E53E3E", cursor: "pointer", fontSize: "13px", fontWeight: 600,
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FFF5F5"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────── */}
      <aside className="admin-sidebar-desktop" style={{
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
        width: "260px",
      }}>
        {sidebarContent}
      </aside>

      {/* ── Mobile top header bar ────────────────────────────────── */}
      <header className="admin-mobile-header" style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "60px",
        background: SIDEBAR_BG, borderBottom: `1px solid ${BORDER}`,
        display: "none", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", zIndex: 200,
        boxShadow: "0 2px 10px rgba(11,29,58,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "8px", borderRadius: "8px", color: TEXT_PRIMARY,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F5F2EC"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: `linear-gradient(135deg, ${GOLD}, #E8C547)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={13} color="#FFF" />
            </div>
            <span style={{ fontWeight: 700, fontSize: "15px", color: TEXT_PRIMARY }}>Mira Cards</span>
          </div>
        </div>

        <div style={{
          width: "34px", height: "34px", borderRadius: "50%",
          background: `linear-gradient(135deg, ${GOLD}, #E8C547)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: 700, color: "#FFF",
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* ── Mobile overlay backdrop ──────────────────────────────── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(11,29,58,0.45)",
            backdropFilter: "blur(3px)",
            zIndex: 300,
          }}
        />
      )}

      {/* ── Mobile slide-in drawer ───────────────────────────────── */}
      <div className="admin-mobile-drawer" style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: "260px",
        zIndex: 400,
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        overflowY: "auto",
        display: "none",
      }}>
        {sidebarContent}
      </div>

      <style>{`
        .admin-nav-item:not(.active):hover {
          background: rgba(11,29,58,0.03) !important;
          color: ${TEXT_PRIMARY} !important;
        }
        @media (max-width: 1024px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-mobile-header   { display: flex !important; }
          .admin-mobile-drawer   { display: block !important; }
        }
      `}</style>
    </>
  );
}
