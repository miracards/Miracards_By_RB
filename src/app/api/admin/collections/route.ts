import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import Collection from "@/lib/models/Collection";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  await connectDB();
  const collections = await Collection.find({}).sort({ sortOrder: 1, createdAt: 1 }).lean();
  return NextResponse.json({ collections });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const { slug, title, description, type, style, menuCategory, coverImage, count, sortOrder } = body;

  if (!slug || !title || !type || !style) {
    return NextResponse.json({ error: "slug, title, type, and style are required" }, { status: 400 });
  }

  await connectDB();

  const existing = await Collection.findOne({ slug: slug.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: "A collection with this slug already exists" }, { status: 409 });
  }

  const collection = await Collection.create({
    slug: slug.toLowerCase(),
    title,
    description: description || "",
    type,
    style,
    menuCategory: menuCategory || "invitation-category",
    coverImage: coverImage || "",
    count: count || "0 Designs",
    sortOrder: sortOrder ?? 0,
  });

  return NextResponse.json({ collection }, { status: 201 });
}
