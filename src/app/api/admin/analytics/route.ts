import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";
import Collection from "@/lib/models/Collection";
import CardImage from "@/lib/models/CardImage";
import PageView from "@/lib/models/PageView";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  await connectDB();

  // 30-day window
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 10);

  const [
    totalInquiries,
    newInquiries,
    totalCollections,
    totalImages,
    statusBreakdown,
    monthlyCounts,
    topCollections,
    topViewedSlugs,
    dailyViews,
    totalViews30d,
  ] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: "new" }),
    Collection.countDocuments({ isActive: true }),
    CardImage.countDocuments({ isActive: true }),

    // Status breakdown for pie chart
    Inquiry.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),

    // Monthly inquiry counts for last 12 months
    Inquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),

    // Top collections by inquiry count
    Inquiry.aggregate([
      { $group: { _id: "$interest", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]),

    // Top 6 most-viewed collection slugs (last 30 days)
    PageView.aggregate([
      { $match: { date: { $gte: thirtyDaysAgoStr } } },
      { $group: { _id: "$slug", views: { $sum: "$count" } } },
      { $sort: { views: -1 } },
      { $limit: 6 },
    ]),

    // Daily page-view totals for last 30 days (for sparkline chart)
    PageView.aggregate([
      { $match: { date: { $gte: thirtyDaysAgoStr } } },
      { $group: { _id: "$date", views: { $sum: "$count" } } },
      { $sort: { _id: 1 } },
    ]),

    // Total page views in last 30 days
    PageView.aggregate([
      { $match: { date: { $gte: thirtyDaysAgoStr } } },
      { $group: { _id: null, total: { $sum: "$count" } } },
    ]),
  ]);

  // Recent 5 inquiries
  const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5).lean();

  return NextResponse.json({
    kpis: {
      totalInquiries,
      newInquiries,
      totalCollections,
      totalImages,
      totalViews30d: (totalViews30d[0]?.total as number) || 0,
    },
    statusBreakdown: statusBreakdown.map((s) => ({ status: s._id, count: s.count })),
    monthlyCounts: monthlyCounts.map((m) => ({
      month: `${m._id.year}-${String(m._id.month).padStart(2, "0")}`,
      count: m.count,
    })),
    topCollections: topCollections.map((t) => ({ name: t._id || "General", count: t.count })),
    topViewedSlugs: topViewedSlugs.map((v) => ({ slug: v._id, views: v.views })),
    dailyViews: dailyViews.map((d) => ({ date: d._id, views: d.views })),
    recentInquiries,
  });
}

