import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import SubCategory from "@/lib/models/SubCategory";
import CardImage from "@/lib/models/CardImage";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  await connectDB();
  const sub = await SubCategory.findByIdAndUpdate(id, { $set: body }, { returnDocument: 'after', runValidators: true });
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ subCategory: sub });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await params;
  await connectDB();

  await SubCategory.findByIdAndDelete(id);
  await CardImage.deleteMany({ subCategoryId: id });

  return NextResponse.json({ success: true });
}
