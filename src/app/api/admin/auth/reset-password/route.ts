import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import PasswordResetToken from "@/lib/models/PasswordResetToken";

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  await connectDB();

  const resetToken = await PasswordResetToken.findOne({ token, used: false });
  if (!resetToken) {
    return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
  }

  if (new Date() > resetToken.expiresAt) {
    await PasswordResetToken.findByIdAndDelete(resetToken._id);
    return NextResponse.json({ error: "Reset token has expired" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await Admin.findOneAndUpdate(
    { email: resetToken.email },
    { passwordHash }
  );

  // Mark token as used
  await PasswordResetToken.findByIdAndUpdate(resetToken._id, { used: true });

  return NextResponse.json({ message: "Password reset successfully" });
}
