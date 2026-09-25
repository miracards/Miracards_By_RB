import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";

/**
 * POST /api/inquiries
 * Public quick-inquiry endpoint called from card lightboxes and collection CTAs.
 * Lighter than /api/contact — no email sent, just DB persist.
 * Body: { name, phone, email?, collection, design?, code?, message?, source? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, collection, design, code, message, source } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const interest = [collection, design, code ? `Code: ${code}` : ""]
      .filter(Boolean)
      .join(" — ");

    const fullMessage =
      message ||
      `Quick inquiry about ${design || collection || "a design"}.${code ? ` Design code: ${code}` : ""}`;

    await connectDB();

    const inquiry = await Inquiry.create({
      name: name.trim(),
      email: email?.trim() || `noreply+${Date.now()}@miracards.in`,
      phone: phone.trim(),
      interest: interest || collection || "Design Inquiry",
      message: fullMessage,
      status: "new",
      source: (source as "contact-form" | "whatsapp" | "phone") || "whatsapp",
    });

    return NextResponse.json(
      { success: true, id: inquiry._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("Quick inquiry error:", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
