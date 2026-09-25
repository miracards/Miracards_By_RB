import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Collection from "@/lib/models/Collection";
import SubCategory from "@/lib/models/SubCategory";
import CardImage from "@/lib/models/CardImage";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  await connectDB();
  const collection = await Collection.findOne({ slug, isActive: true }).lean();
  if (!collection) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 });
  }

  const collectionId = (collection as { _id: { toString(): string } })._id.toString();

  const [subCategories, images] = await Promise.all([
    SubCategory.find({ collectionId, isActive: true }).sort({ sortOrder: 1 }).lean(),
    CardImage.find({ collectionId, isActive: true }).sort({ sortOrder: 1 }).lean(),
  ]);

  return NextResponse.json({ collection, subCategories, images });
}
