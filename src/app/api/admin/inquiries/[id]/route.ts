import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const { status, adminNotes } = body;

  await connectDB();
  const update: Record<string, unknown> = {};
  if (status) update.status = status;
  if (adminNotes !== undefined) update.adminNotes = adminNotes;

  const inquiry = await Inquiry.findByIdAndUpdate(id, { $set: update }, { returnDocument: 'after' });
  if (!inquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ inquiry });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  await connectDB();
  await Inquiry.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
