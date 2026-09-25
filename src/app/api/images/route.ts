import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CardImage from "@/lib/models/CardImage";
import Collection from "@/lib/models/Collection";

export async function GET() {
  await connectDB();
  // Ensure Collection model is registered for populate
  const _col = Collection;
  
  const images = await CardImage.find({ isActive: true })
    .populate("collectionId", "title slug")
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();

  return NextResponse.json({ images });
}
