import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import Inquiry, { InquiryStatus } from "@/lib/models/Inquiry";

export async function GET(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  await connectDB();

  const validStatuses: InquiryStatus[] = ["new", "read", "replied", "resolved"];
  const hasStatus = status && status !== "all" && (validStatuses as string[]).includes(status);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = hasStatus ? { status } : {};

  const total = await Inquiry.countDocuments(filter);
  const inquiries = await Inquiry.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({ inquiries, total, page, limit });
}
