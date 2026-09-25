import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Collection from "@/lib/models/Collection";
import SubCategory from "@/lib/models/SubCategory";
import CardImage from "@/lib/models/CardImage";

/**
 * GET /api/collections/nav
 * Returns active collections and their subcategories (with designs) grouped by menuCategory for navbar.
 */
export async function GET() {
  await connectDB();

  const collections = await Collection.find({ isActive: true })
    .select("slug title menuCategory sortOrder")
    .sort({ menuCategory: 1, sortOrder: 1, createdAt: 1 })
    .lean();

  const colIds = collections.map((c) => c._id);

  // Only include subcategories that actually have active card images in DB
  const activeSubCatIds = await CardImage.distinct("subCategoryId", {
    collectionId: { $in: colIds },
    subCategoryId: { $ne: null },
    isActive: true,
  });

  const subCategories = await SubCategory.find({
    _id: { $in: activeSubCatIds },
    collectionId: { $in: colIds },
    isActive: true,
  })
    .select("collectionId name slug sortOrder")
    .sort({ sortOrder: 1 })
    .lean();

  const subCatMap: Record<string, { slug: string; name: string }[]> = {};
  for (const sub of subCategories) {
    const cid = sub.collectionId.toString();
    if (!subCatMap[cid]) subCatMap[cid] = [];
    subCatMap[cid].push({ slug: sub.slug, name: sub.name });
  }

  const grouped: Record<
    string,
    { slug: string; title: string; subCategories: { slug: string; name: string }[] }[]
  > = {
    "invitation-category": [],
    "welcome-board": [],
    "wedding-itinerary": [],
    "video-invitation": [],
  };

  for (const col of collections) {
    const cat = (col as any).menuCategory ?? "invitation-category";
    const cid = col._id.toString();
    if (grouped[cat]) {
      grouped[cat].push({
        slug: col.slug,
        title: col.title,
        subCategories: subCatMap[cid] || [],
      });
    }
  }

  return NextResponse.json({ grouped }, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
