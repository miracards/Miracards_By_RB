import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Collection from "@/lib/models/Collection";

export async function GET() {
  await connectDB();
  const collections = await Collection.find({ isActive: true })
    .sort({ sortOrder: 1, createdAt: 1 })
    .lean();

  return NextResponse.json({ collections });
}
