import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import PasswordResetToken from "@/lib/models/PasswordResetToken";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
  if (!resend) return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });

  await connectDB();
  const admin = await Admin.findOne({ email: email.toLowerCase() });

  // Always return success to prevent email enumeration
  if (!admin) {
    return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
  }

  // Invalidate existing tokens
  await PasswordResetToken.deleteMany({ email: email.toLowerCase() });

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await PasswordResetToken.create({ email: email.toLowerCase(), token, expiresAt });

  const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${token}`;

  await resend.emails.send({
    from: `Mira Cards Admin <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject: "Reset Your Admin Password — Mira Cards",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #0B1D3A; margin-bottom: 8px;">Password Reset Request</h2>
        <p style="color: #5F5F5F; margin-bottom: 24px;">
          Click the button below to reset your Mira Cards admin password. This link expires in <strong>1 hour</strong>.
        </p>
        <a href="${resetUrl}" 
           style="display:inline-block; background:#C9A227; color:#fff; padding:14px 32px; border-radius:30px; font-weight:700; text-decoration:none; font-size:14px;">
          Reset Password
        </a>
        <p style="color:#999; font-size:12px; margin-top:32px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
}
