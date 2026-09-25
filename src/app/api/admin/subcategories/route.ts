import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import SubCategory from "@/lib/models/SubCategory";

export async function GET(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const collectionId = searchParams.get("collectionId");

  await connectDB();
  const query = collectionId ? { collectionId } : {};
  const subCategories = await SubCategory.find(query).sort({ sortOrder: 1 }).lean();
  return NextResponse.json({ subCategories });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const { collectionId, slug, name, prefix, coverImage, sortOrder } = body;

  if (!collectionId || !slug || !name || !prefix) {
    return NextResponse.json({ error: "collectionId, slug, name, prefix are required" }, { status: 400 });
  }

  await connectDB();
  const subCategory = await SubCategory.create({
    collectionId,
    slug: slug.toLowerCase(),
    name,
    prefix: prefix.toUpperCase(),
    coverImage: coverImage || "",
    sortOrder: sortOrder ?? 0,
  });

  return NextResponse.json({ subCategory }, { status: 201 });
}
