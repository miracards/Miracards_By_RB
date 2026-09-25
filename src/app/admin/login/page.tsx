"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FEFEFE 0%, #FDF8EF 50%, #FBF3E2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Decorative background pattern */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(201,162,39,0.06) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(201,162,39,0.04) 0%, transparent 50%)`,
      }} />

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "16px",
            background: "linear-gradient(135deg, #C9A227, #E8C547)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(201,162,39,0.25)",
          }}>
            <Sparkles size={24} color="#FFFFFF" />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0B1D3A", margin: "0 0 6px" }}>
            Mira Cards Admin
          </h1>
          <p style={{ fontSize: "14px", color: "#718096", margin: 0 }}>
            Super Admin Control Panel
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 4px 24px rgba(11,29,58,0.08), 0 1px 4px rgba(11,29,58,0.04)",
          border: "1px solid rgba(11,29,58,0.06)",
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0B1D3A", margin: "0 0 24px" }}>
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0B1D3A", marginBottom: "8px" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={16} color="#C9A227" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@miracards.in"
                  required
                  style={{
                    width: "100%", padding: "12px 14px 12px 40px",
                    border: "1.5px solid #E2E8F0", borderRadius: "10px",
                    fontSize: "14px", color: "#0B1D3A", background: "#F8F9FA",
                    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#C9A227"; e.target.style.background = "#FFF"; }}
                  onBlur={e => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "#F8F9FA"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0B1D3A", marginBottom: "8px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#C9A227" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="admin-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%", padding: "12px 44px 12px 40px",
                    border: "1.5px solid #E2E8F0", borderRadius: "10px",
                    fontSize: "14px", color: "#0B1D3A", background: "#F8F9FA",
                    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#C9A227"; e.target.style.background = "#FFF"; }}
                  onBlur={e => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "#F8F9FA"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#718096", padding: "4px",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "#FFF5F5", border: "1px solid #FED7D7",
                borderRadius: "8px", padding: "12px 16px",
                fontSize: "13px", color: "#C53030", display: "flex", gap: "8px", alignItems: "center",
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="admin-login-btn"
              disabled={loading}
              style={{
                background: loading ? "#D4A' " : "linear-gradient(135deg, #C9A227, #D4AF37)",
                color: "#FFFFFF", border: "none", borderRadius: "12px",
                padding: "14px 24px", fontSize: "14px", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.5px", marginTop: "8px",
                boxShadow: "0 4px 14px rgba(201,162,39,0.3)",
                transition: "all 0.2s", opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              href="/admin/forgot-password"
              style={{ fontSize: "13px", color: "#C9A227", textDecoration: "none", fontWeight: 500 }}
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#A0AEC0", marginTop: "24px" }}>
          © {new Date().getFullYear()} Mira Cards · Secured Admin Portal
        </p>
      </div>
    </div>
  );
}
