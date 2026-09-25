import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageView from "@/lib/models/PageView";

/**
 * POST /api/track
 * Fire-and-forget endpoint. Called on every collection detail page mount.
 * Increments the daily view counter for a given slug.
 * Body: { slug: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ ok: false }, { status: 400 });

    const date = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    await connectDB();

    await PageView.findOneAndUpdate(
      { slug, date },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' }
    );

    return NextResponse.json({ ok: true });
  } catch {
    // Silently fail — tracking should never block the user
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
