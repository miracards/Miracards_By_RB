"use client";

import React, { useState } from "react";
import { KeyRound, User, CheckCircle, AlertCircle } from "lucide-react";

const GOLD = "#C9A227";
const NAVY = "#0B1D3A";
const BORDER = "#E7DFD4";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div style={{ background: "#FFF", borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "28px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(11,29,58,0.01)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${BORDER}` }}>
        <Icon size={18} color={GOLD} />
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: NAVY, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Inp({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: NAVY, marginBottom: "6px" }}>{label}</label>
      <input {...props} className="premium-input" />
    </div>
  );
}

function Alert({ type, msg }: { type: "success" | "error"; msg: string }) {
  const color = type === "success" ? "#10B981" : "#E53E3E";
  const bg = type === "success" ? "#F0FDF4" : "#FFF5F5";
  const border = type === "success" ? "#BBF7D0" : "#FED7D7";
  const Icon = type === "success" ? CheckCircle : AlertCircle;
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", background: bg, border: `1px solid ${border}`, borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color, marginBottom: "16px" }}>
      <Icon size={15} /> {msg}
    </div>
  );
}

export default function SettingsPage() {
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwStatus, setPwStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { setPwStatus({ type: "error", msg: "New passwords do not match." }); return; }
    if (pwForm.newPw.length < 8) { setPwStatus({ type: "error", msg: "Password must be at least 8 characters." }); return; }
    setPwLoading(true); setPwStatus(null);
    const res = await fetch("/api/admin/auth/change-password", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.newPw }),
    });
    const d = await res.json();
    setPwLoading(false);
    if (res.ok) { setPwStatus({ type: "success", msg: d.message }); setPwForm({ current: "", newPw: "", confirm: "" }); }
    else { setPwStatus({ type: "error", msg: d.error ?? "Failed to change password." }); }
  };

  return (
    <div style={{ padding: "32px", maxWidth: "680px" }}>
      <style>{`
        .premium-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid ${BORDER};
          border-radius: 10px;
          font-size: 14px;
          color: ${NAVY};
          background: #FDFCFB;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .premium-input:focus {
          border-color: ${GOLD};
          background: #FFF;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
        }
        .gold-btn {
          background: ${GOLD};
          color: #FFF;
          border: none;
          border-radius: 10px;
          padding: 11px 24px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(201,162,39,0.2);
          transition: all 0.25s ease;
        }
        .gold-btn:hover {
          background: #A88414;
          transform: translateY(-1px);
        }
        .gold-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: NAVY, margin: "0 0 4px" }}>Settings</h1>
        <p style={{ fontSize: "14px", color: "#5F5F5F", margin: 0, fontWeight: 500 }}>Manage your admin account details and security settings</p>
      </div>

      {/* Change Password */}
      <Section title="Change Password" icon={KeyRound}>
        <form onSubmit={handleChangePassword}>
          <Inp label="Current Password" type="password" value={pwForm.current} onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))} placeholder="••••••••" required />
          <Inp label="New Password" type="password" value={pwForm.newPw} onChange={e => setPwForm(f => ({ ...f, newPw: e.target.value }))} placeholder="Min 8 characters" required minLength={8} />
          <Inp label="Confirm New Password" type="password" value={pwForm.confirm} onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Repeat new password" required />
          {pwStatus && <Alert type={pwStatus.type} msg={pwStatus.msg} />}
          <button type="submit" disabled={pwLoading} className="gold-btn">
            {pwLoading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </Section>

      {/* Info Box */}
      <Section title="About This Panel" icon={User}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { label: "Platform", value: "Mira Cards Super Admin" },
            { label: "Version", value: "1.0.0" },
            { label: "Auth Mode", value: "NextAuth v5 · JWT Session" },
            { label: "Database Engine", value: "MongoDB Atlas" },
            { label: "Storage Engine", value: "AWS S3" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${BORDER}60` }}>
              <span style={{ fontSize: "13px", color: "#5F5F5F", fontWeight: 600 }}>{label}</span>
              <span style={{ fontSize: "13px", color: NAVY, fontWeight: 700 }}>{value}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
