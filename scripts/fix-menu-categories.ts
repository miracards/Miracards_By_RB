/**
 * Migration: Fix menuCategory for existing collections.
 * - "welcome-boards" → menuCategory: "welcome-board"
 * - "vastupujan-invitation" → menuCategory: "video-invitation"
 *
 * Run: npx tsx scripts/fix-menu-categories.ts
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

async function migrate() {
  await mongoose.connect(MONGODB_URI!);
  console.log("✅ Connected to MongoDB");

  const db = mongoose.connection.db!;
  const collections = db.collection("collections");

  // Fix welcome-boards → welcome-board
  const wb = await collections.updateOne(
    { slug: "welcome-boards" },
    { $set: { menuCategory: "welcome-board" } }
  );
  console.log(
    wb.matchedCount
      ? `✅ welcome-boards: menuCategory set to "welcome-board" (modified: ${wb.modifiedCount})`
      : "⚠️  welcome-boards collection not found in DB"
  );

  // Fix vastupujan-invitation → video-invitation
  const vpt = await collections.updateOne(
    { slug: "vastupujan-invitation" },
    { $set: { menuCategory: "video-invitation" } }
  );
  console.log(
    vpt.matchedCount
      ? `✅ vastupujan-invitation: menuCategory set to "video-invitation" (modified: ${vpt.modifiedCount})`
      : "⚠️  vastupujan-invitation collection not found in DB"
  );

  await mongoose.disconnect();
  console.log("🎉 Migration complete!");
}

migrate().catch((e) => {
  console.error("❌ Migration failed:", e);
  process.exit(1);
});
