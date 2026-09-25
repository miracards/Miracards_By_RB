"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";

function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus("error"); setMessage("Passwords do not match."); return;
    }
    setStatus("loading");
    const res = await fetch("/api/admin/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await res.json();
    if (res.ok) { setStatus("success"); setMessage(data.message); }
    else { setStatus("error"); setMessage(data.error || "Something went wrong."); }
  };

  return (
    <div style={{
      background: "#FFFFFF", borderRadius: "20px", padding: "40px",
      boxShadow: "0 4px 24px rgba(11,29,58,0.08)", border: "1px solid rgba(11,29,58,0.06)",
    }}>
      {status === "success" ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0B1D3A", marginBottom: "12px" }}>Password Reset!</h2>
          <p style={{ fontSize: "14px", color: "#5F5F5F" }}>{message}</p>
          <Link href="/admin/login" style={{ display: "inline-block", marginTop: "24px", background: "#C9A227", color: "#fff", padding: "12px 28px", borderRadius: "30px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
            Sign In Now
          </Link>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0B1D3A", margin: "0 0 24px" }}>Set New Password</h2>
          {!token && (
            <div style={{ background: "#FFF5F5", border: "1px solid #FED7D7", borderRadius: "8px", padding: "12px 16px", fontSize: "13px", color: "#C53030", marginBottom: "16px" }}>
              ⚠️ Invalid or missing reset token. Please request a new reset link.
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {["New Password", "Confirm Password"].map((label, i) => (
              <div key={label}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0B1D3A", marginBottom: "8px" }}>{label}</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={show ? "text" : "password"}
                    value={i === 0 ? newPassword : confirmPassword}
                    onChange={e => i === 0 ? setNewPassword(e.target.value) : setConfirmPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    required minLength={8}
                    style={{ width: "100%", padding: "12px 44px 12px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "14px", background: "#F8F9FA", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => { e.target.style.borderColor = "#C9A227"; e.target.style.background = "#FFF"; }}
                    onBlur={e => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "#F8F9FA"; }}
                  />
                  {i === 0 && <button type="button" onClick={() => setShow(v => !v)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#718096" }}>
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>}
                </div>
              </div>
            ))}
            {status === "error" && <p style={{ color: "#C53030", fontSize: "13px", margin: 0 }}>⚠️ {message}</p>}
            <button
              type="submit" disabled={status === "loading" || !token}
              style={{ background: "linear-gradient(135deg, #C9A227, #D4AF37)", color: "#fff", border: "none", borderRadius: "12px", padding: "14px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(201,162,39,0.3)" }}
            >
              {status === "loading" ? "Resetting…" : "Reset Password"}
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
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #FEFEFE 0%, #FDF8EF 50%, #FBF3E2 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, #C9A227, #E8C547)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(201,162,39,0.25)" }}>
            <Sparkles size={24} color="#FFFFFF" />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0B1D3A", margin: "0 0 6px" }}>Reset Password</h1>
          <p style={{ fontSize: "14px", color: "#718096", margin: 0 }}>Mira Cards Admin Portal</p>
        </div>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "40px", color: "#718096" }}>Loading…</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
