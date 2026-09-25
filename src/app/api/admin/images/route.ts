import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";
import connectDB from "@/lib/mongodb";
import CardImage from "@/lib/models/CardImage";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_BUCKET_NAME!;
const S3_BASE = process.env.NEXT_PUBLIC_S3_BASE_URL!;

// GET: List images for a collection
export async function GET(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const collectionId = searchParams.get("collectionId");
  const subCategoryId = searchParams.get("subCategoryId");

  await connectDB();
  const query: Record<string, unknown> = {};
  if (collectionId) query.collectionId = collectionId;
  if (subCategoryId) query.subCategoryId = subCategoryId;

  const images = await CardImage.find(query).sort({ sortOrder: 1 }).lean();
  return NextResponse.json({ images });
}

// POST: Get presigned upload URL + register metadata OR upload file directly
export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const collectionId = formData.get("collectionId") as string;
      const subCategoryId = formData.get("subCategoryId") as string;
      const s3Key = formData.get("s3Key") as string;
      const code = formData.get("code") as string;
      const title = formData.get("title") as string;
      const details = formData.get("details") as string;
      const sortOrderVal = formData.get("sortOrder");
      const sortOrder = sortOrderVal ? Number(sortOrderVal) : 0;

      if (!file || !collectionId || !s3Key || !code || !title) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const isVideo = file.type.startsWith("video/");
      const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json({ error: `File size exceeds the limit of ${isVideo ? "100MB" : "10MB"}` }, { status: 400 });
      }

      // Upload to S3 directly from the server (bypassing browser CORS)
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: s3Key,
        Body: buffer,
        ContentType: file.type,
      }));

      await connectDB();
      const image = await CardImage.create({
        collectionId,
        subCategoryId: subCategoryId || null,
        s3Key,
        s3Url: `${S3_BASE}/${s3Key}`,
        code,
        title,
        details: details || "",
        sortOrder: sortOrder ?? 0,
      });

      return NextResponse.json({ image }, { status: 201 });
    } catch (err: any) {
      console.error("Direct S3 upload error:", err);
      return NextResponse.json({ error: err.message || "Failed to upload image" }, { status: 500 });
    }
  }

  // Legacy JSON Support
  const body = await req.json();
  const { collectionId, subCategoryId, s3Key, code, title, details, sortOrder, action } = body;

  // Return presigned URL only
  if (action === "presign") {
    if (!s3Key) return NextResponse.json({ error: "s3Key required" }, { status: 400 });
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
      ContentType: "image/webp",
    });
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    return NextResponse.json({ uploadUrl, s3Key, s3Url: `${S3_BASE}/${s3Key}` });
  }

  // Register image metadata after upload
  if (!collectionId || !s3Key || !code || !title) {
    return NextResponse.json({ error: "collectionId, s3Key, code, title required" }, { status: 400 });
  }

  await connectDB();
  const image = await CardImage.create({
    collectionId,
    subCategoryId: subCategoryId || null,
    s3Key,
    s3Url: `${S3_BASE}/${s3Key}`,
    code,
    title,
    details: details || "",
    sortOrder: sortOrder ?? 0,
  });

  return NextResponse.json({ image }, { status: 201 });
}

// PATCH: Update image metadata OR upload new file directly and update metadata
export async function PATCH(req: NextRequest) {
  const { error: sessionErr } = await requireAdminSession();
  if (sessionErr) return sessionErr;

  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get("id");
  if (!imageId) return NextResponse.json({ error: "id required" }, { status: 400 });

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const s3Key = formData.get("s3Key") as string;
      const code = formData.get("code") as string;
      const title = formData.get("title") as string;
      const details = formData.get("details") as string;
      const subCategoryId = formData.get("subCategoryId") as string;
      const sortOrderVal = formData.get("sortOrder");
      const sortOrder = sortOrderVal !== null ? Number(sortOrderVal) : undefined;

      await connectDB();
      const image = await CardImage.findById(imageId);
      if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

      if (file) {
        if (!s3Key) return NextResponse.json({ error: "s3Key required for file upload" }, { status: 400 });
        const isVideo = file.type.startsWith("video/");
        const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
          return NextResponse.json({ error: `File size exceeds the limit of ${isVideo ? "100MB" : "10MB"}` }, { status: 400 });
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await s3.send(new PutObjectCommand({
          Bucket: BUCKET,
          Key: s3Key,
          Body: buffer,
          ContentType: file.type,
        }));
        image.s3Key = s3Key;
        image.s3Url = `${S3_BASE}/${s3Key}`;
      }

      if (code !== undefined) image.code = code;
      if (title !== undefined) image.title = title;
      if (details !== undefined) image.details = details;
      image.subCategoryId = (subCategoryId || null) as any;
      if (sortOrder !== undefined) image.sortOrder = sortOrder;

      await image.save();
      return NextResponse.json({ image });
    } catch (err: any) {
      console.error("Direct S3 patch upload error:", err);
      return NextResponse.json({ error: err.message || "Failed to update image" }, { status: 500 });
    }
  }

  // Legacy JSON PATCH
  const body = await req.json();
  const { code, title, details, subCategoryId, s3Key, s3Url, sortOrder } = body;

  await connectDB();
  const image = await CardImage.findById(imageId);
  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (code !== undefined) image.code = code;
  if (title !== undefined) image.title = title;
  if (details !== undefined) image.details = details;
  image.subCategoryId = subCategoryId || null;
  if (s3Key !== undefined) {
    image.s3Key = s3Key;
    if (s3Url !== undefined) image.s3Url = s3Url;
  }
  if (sortOrder !== undefined) image.sortOrder = sortOrder;

  await image.save();
  return NextResponse.json({ image });
}

// DELETE: Remove image from S3 and MongoDB
export async function DELETE(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get("id");
  if (!imageId) return NextResponse.json({ error: "id required" }, { status: 400 });

  await connectDB();
  const image = await CardImage.findById(imageId);
  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete from S3
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: image.s3Key }));
  } catch {
    // continue even if S3 delete fails
  }

  await CardImage.findByIdAndDelete(imageId);
  return NextResponse.json({ success: true });
}
