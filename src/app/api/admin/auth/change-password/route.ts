import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function POST(req: NextRequest) {
  const { session, error } = await requireAdminSession();
  if (error) return error;

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Both passwords are required" }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  await connectDB();
  const admin = await Admin.findOne({ email: session!.user!.email!.toLowerCase() });
  if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

  const isValid = await admin.comparePassword(currentPassword);
  if (!isValid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });

  admin.passwordHash = await bcrypt.hash(newPassword, 12);
  await admin.save();

  return NextResponse.json({ message: "Password changed successfully" });
}
