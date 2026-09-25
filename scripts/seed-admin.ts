/**
 * Seed script: creates the first Super Admin account.
 * Run: npx tsx scripts/seed-admin.ts
 * 
 * Set MONGODB_URI and NEXTAUTH_SECRET in .env.local first.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "superadmin" },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function seed() {
  // ────────────────────────────────────────────────
  // 👇 Change these before running the script
  const ADMIN_NAME = "Mira Admin";
  const ADMIN_EMAIL = "admin@miracards.in";
  const ADMIN_PASSWORD = "MiraAdmin@2024";   // change this!
  // ────────────────────────────────────────────────

  await mongoose.connect(MONGODB_URI!);
  console.log("✅ Connected to MongoDB");

  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`⚠️  Admin with email ${ADMIN_EMAIL} already exists.`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.create({ email: ADMIN_EMAIL, passwordHash, name: ADMIN_NAME });

  console.log("✅ Super Admin created successfully!");
  console.log(`   Email: ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log("   ⚠️  Please change the password after first login.");

  await mongoose.disconnect();
}

seed().catch(e => { console.error("❌", e); process.exit(1); });
