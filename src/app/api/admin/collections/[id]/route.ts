import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import Collection from "@/lib/models/Collection";
import SubCategory from "@/lib/models/SubCategory";
import CardImage from "@/lib/models/CardImage";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  await connectDB();

  const collection = await Collection.findById(id).lean();
  if (!collection) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const subCategories = await SubCategory.find({ collectionId: id }).sort({ sortOrder: 1 }).lean();
  const imageCount = await CardImage.countDocuments({ collectionId: id, isActive: true });

  return NextResponse.json({ collection, subCategories, imageCount });
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  await connectDB();
  const collection = await Collection.findByIdAndUpdate(id, { $set: body }, { returnDocument: 'after', runValidators: true });
  if (!collection) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ collection });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  await connectDB();

  await Collection.findByIdAndDelete(id);
  await SubCategory.deleteMany({ collectionId: id });
  await CardImage.deleteMany({ collectionId: id });

  return NextResponse.json({ success: true });
}
