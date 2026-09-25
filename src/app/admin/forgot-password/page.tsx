"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Sparkles } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/admin/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("sent");
      setMessage("If that email is registered, a reset link has been sent. Please check your inbox.");
    } else {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FEFEFE 0%, #FDF8EF 50%, #FBF3E2 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "16px",
            background: "linear-gradient(135deg, #C9A227, #E8C547)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(201,162,39,0.25)",
          }}>
            <Sparkles size={24} color="#FFFFFF" />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0B1D3A", margin: "0 0 6px" }}>Reset Password</h1>
          <p style={{ fontSize: "14px", color: "#718096", margin: 0 }}>Mira Cards Admin Portal</p>
        </div>

        <div style={{
          background: "#FFFFFF", borderRadius: "20px", padding: "40px",
          boxShadow: "0 4px 24px rgba(11,29,58,0.08), 0 1px 4px rgba(11,29,58,0.04)",
          border: "1px solid rgba(11,29,58,0.06)",
        }}>
          {status === "sent" ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>📧</div>
              <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0B1D3A", marginBottom: "12px" }}>Check Your Email</h2>
              <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.6 }}>{message}</p>
              <Link href="/admin/login" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                marginTop: "24px", color: "#C9A227", textDecoration: "none", fontWeight: 600, fontSize: "14px",
              }}>
                <ArrowLeft size={14} /> Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <KeyRound size={20} color="#C9A227" />
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0B1D3A", margin: 0 }}>Forgot your password?</h2>
              </div>
              <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "24px", lineHeight: 1.6 }}>
                Enter your admin email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0B1D3A", marginBottom: "8px" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@miracards.in"
                    required
                    style={{
                      width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0",
                      borderRadius: "10px", fontSize: "14px", color: "#0B1D3A",
                      background: "#F8F9FA", outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={e => { e.target.style.borderColor = "#C9A227"; e.target.style.background = "#FFF"; }}
                    onBlur={e => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "#F8F9FA"; }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#C53030", fontSize: "13px", margin: 0 }}>⚠️ {message}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    background: "linear-gradient(135deg, #C9A227, #D4AF37)", color: "#FFFFFF",
                    border: "none", borderRadius: "12px", padding: "14px 24px",
                    fontSize: "14px", fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(201,162,39,0.3)", opacity: status === "loading" ? 0.7 : 1,
                  }}
                >
                  {status === "loading" ? "Sending…" : "Send Reset Link"}
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link href="/admin/login" style={{ fontSize: "13px", color: "#718096", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <ArrowLeft size={12} /> Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
