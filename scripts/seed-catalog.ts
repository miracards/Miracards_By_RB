/**
 * Seed script: populates catalog data (collections, subcategories, card images).
 * Run: npx tsx scripts/seed-catalog.ts
 * 
 * Set MONGODB_URI in .env.local first.
 */
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

// Inline schema definitions to match src/lib/models
const CollectionSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    type: { type: String, enum: ["Print", "Digital"], required: true },
    style: { type: String, enum: ["Traditional", "Luxury", "Modern"], required: true },
    coverImage: { type: String, default: "" },
    count: { type: String, default: "0 Designs" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SubCategorySchema = new Schema(
  {
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection", required: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    prefix: { type: String, required: true, uppercase: true, trim: true },
    coverImage: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
SubCategorySchema.index({ collectionId: 1, slug: 1 }, { unique: true });

const CardImageSchema = new Schema(
  {
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection", required: true },
    subCategoryId: { type: Schema.Types.ObjectId, ref: "SubCategory", default: null },
    s3Key: { type: String, required: true },
    s3Url: { type: String, required: true },
    code: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    details: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
CardImageSchema.index({ collectionId: 1, sortOrder: 1 });
CardImageSchema.index({ collectionId: 1, subCategoryId: 1 });

const Collection = mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);
const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", SubCategorySchema);
const CardImage = mongoose.models.CardImage || mongoose.model("CardImage", CardImageSchema);

const S3_BASE = "https://mira-cards.s3.eu-north-1.amazonaws.com";

const COLLECTIONS_DATA = [
  {
    slug: "wedding-invitation",
    title: "Wedding Invitation",
    type: "Print",
    style: "Luxury",
    coverImage: `${S3_BASE}/collections/new-wedding/1.webp`,
    count: "30+ Designs",
    description: "Explore our latest collection of premium luxury wedding cards. Featuring detailed traditional heritage borders, metallic hot gold foil stampings, custom embossing, and handcrafted finishes on heavy linen and cotton cardstock.",
    details: ["Heritage design layouts", "Premium hot foil stamping", "Silk thread and ribbon borders", "Luxury custom envelopes included"],
    sortOrder: 1,
  },
  {
    slug: "premium-money-envelop",
    title: "Premium Money Envelop",
    type: "Print",
    style: "Luxury",
    coverImage: `${S3_BASE}/collections/premium-money-envelop/1.webp`,
    count: "30+ Designs",
    description: "Crafted from ultra-heavy textured paper and styled with gold hot foil accents, our premium money envelopes add an undeniable touch of class to your gifts.",
    details: ["350 GSM premium paper", "Refined hot foil stamping", "Custom monogram printing", "Magnetic lock flaps"],
    sortOrder: 2,
  },
  {
    slug: "engagement-invitation",
    title: "Engagement Invitation",
    type: "Print",
    style: "Traditional",
    coverImage: `${S3_BASE}/collections/engagement-invitation/1.webp`,
    count: "30+ Designs",
    description: "Our engagement invitations combine traditional script styles with contemporary floral borders, printed on tactile textured cardstocks for a stunning first impression.",
    details: ["Textured high-grade cardstock", "Intricate gold foil lettering", "Sleek double-page inserts", "Hand-tied wax seal options"],
    sortOrder: 3,
  },
  {
    slug: "babyshower-invitation",
    title: "Babyshower Invitation",
    type: "Print",
    style: "Modern",
    coverImage: `${S3_BASE}/collections/babyshower-card/1.webp`,
    count: "30+ Designs",
    description: "Playful pastel color palettes and custom illustrations printed on premium heavyweight textured cardstock. Comes with custom themed envelopes.",
    details: ["300 GSM textured art cardstock", "Soft pastel theme palettes", "Custom envelope inserts", "Laser-cut flap closures"],
    sortOrder: 4,
  },
  {
    slug: "welcome-boards",
    title: "Welcome boards",
    type: "Print",
    style: "Modern",
    menuCategory: "welcome-board",
    coverImage: `${S3_BASE}/collections/welcome-board/wedding/1.webp`,
    count: "240+ Designs",
    description: "Premium frosted acrylic or heavy cardboard welcome boards, customized with your wedding theme colors, monogram scripts, and floral illustrations.",
    details: ["3mm frosted & clear acrylic options", "Sunboard high-fidelity print options", "Rich metallic gold or silver paint print", "Scratch-resistant finish"],
    sortOrder: 5,
  },
  {
    slug: "vastupujan-invitation",
    title: "Vastupujan Invitation",
    type: "Digital",
    style: "Traditional",
    menuCategory: "invitation-category",
    coverImage: `${S3_BASE}/collections/vastupujan-invitation/1.webp`,
    count: "30+ Designs",
    description: "Premium digital invitation e-cards and animations featuring traditional housewarming rituals, custom background music, and storytelling themes to invite your guests to your new home.",
    details: ["High-Definition digital designs", "Customizable details & music", "Traditional rangoli & kalash graphics", "Easy WhatsApp & social sharing"],
    sortOrder: 6,
  },
];

const WELCOME_BOARD_SUBCATEGORIES = [
  { name: "Haldi", prefix: "HLD", slug: "haldi", sortOrder: 1 },
  { name: "Mehendi", prefix: "MHD", slug: "mehendi", sortOrder: 2 },
  { name: "Sangeet", prefix: "SGT", slug: "sangeet", sortOrder: 3 },
  { name: "Wedding", prefix: "WDG", slug: "wedding", sortOrder: 4 },
  { name: "Engagement", prefix: "EGT", slug: "engagement", sortOrder: 5 },
  { name: "Kankupagla", prefix: "KKP", slug: "kankupagla", sortOrder: 6 },
  { name: "Mandap", prefix: "MDP", slug: "mandap", sortOrder: 7 },
  { name: "Kankotri Lekhan", prefix: "KKL", slug: "kankotri-lekhan", sortOrder: 8 },
];

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log("✅ Connected to MongoDB");

  // 1. Wipe collections
  console.log("🧹 Cleaning existing catalog collections, subcategories, and card images...");
  await Promise.all([
    Collection.deleteMany({}),
    SubCategory.deleteMany({}),
    CardImage.deleteMany({}),
  ]);
  console.log("🧹 Done cleaning.");

  // 2. Seed collections
  console.log("🌱 Seeding collections...");
  const createdCollectionsMap: Record<string, mongoose.Types.ObjectId> = {};
  for (const col of COLLECTIONS_DATA) {
    const doc = await Collection.create(col);
    createdCollectionsMap[col.slug] = doc._id;
    console.log(`   + Created Collection: "${col.title}" (slug: ${col.slug})`);
  }

  // 3. Seed welcome board sub-categories
  console.log("🌱 Seeding subcategories under 'welcome-boards'...");
  const welcomeBoardColId = createdCollectionsMap["welcome-boards"];
  const createdSubCategoriesMap: Record<string, mongoose.Types.ObjectId> = {};

  if (welcomeBoardColId) {
    for (const sub of WELCOME_BOARD_SUBCATEGORIES) {
      const doc = await SubCategory.create({
        collectionId: welcomeBoardColId,
        slug: sub.slug,
        name: sub.name,
        prefix: sub.prefix,
        coverImage: `${S3_BASE}/collections/welcome-board/${sub.slug}/1.webp`,
        sortOrder: sub.sortOrder,
      });
      createdSubCategoriesMap[sub.slug] = doc._id;
      console.log(`   + Created SubCategory: "${sub.name}" under Welcome Boards`);
    }
  }

  // 4. Seed card images
  console.log("🌱 Seeding card images (30 per collection/sub-category)...");
  const cardImagesToInsert = [];

  // Wedding Invitation
  const weddingId = createdCollectionsMap["wedding-invitation"];
  if (weddingId) {
    for (let i = 0; i < 30; i++) {
      cardImagesToInsert.push({
        collectionId: weddingId,
        subCategoryId: null,
        s3Key: `collections/new-wedding/${i + 1}.webp`,
        s3Url: `${S3_BASE}/collections/new-wedding/${i + 1}.webp`,
        code: `NW-${String(i + 1).padStart(3, "0")}`,
        title: `Wedding Suite #${i + 1}`,
        details: "Premium wedding invitation suite featuring heritage motifs and gold foil highlights.",
        sortOrder: i + 1,
      });
    }
  }

  // Premium Money Envelop
  const pmeId = createdCollectionsMap["premium-money-envelop"];
  if (pmeId) {
    for (let i = 0; i < 30; i++) {
      cardImagesToInsert.push({
        collectionId: pmeId,
        subCategoryId: null,
        s3Key: `collections/premium-money-envelop/${i + 1}.webp`,
        s3Url: `${S3_BASE}/collections/premium-money-envelop/${i + 1}.webp`,
        code: `PME-${String(i + 1).padStart(3, "0")}`,
        title: `Premium Envelope Suite #${i + 1}`,
        details: "Sleek and heavy-duty envelope featuring custom seal monograms and hot-foil lining.",
        sortOrder: i + 1,
      });
    }
  }

  // Engagement Invitation
  const engagementId = createdCollectionsMap["engagement-invitation"];
  if (engagementId) {
    for (let i = 0; i < 30; i++) {
      cardImagesToInsert.push({
        collectionId: engagementId,
        subCategoryId: null,
        s3Key: `collections/engagement-invitation/${i + 1}.webp`,
        s3Url: `${S3_BASE}/collections/engagement-invitation/${i + 1}.webp`,
        code: `EGT-${String(i + 1).padStart(3, "0")}`,
        title: `Engagement Suite #${i + 1}`,
        details: "Minimalist floral engagement card with premium letterpress typography.",
        sortOrder: i + 1,
      });
    }
  }

  // Babyshower Invitation
  const bscId = createdCollectionsMap["babyshower-invitation"];
  if (bscId) {
    for (let i = 0; i < 30; i++) {
      cardImagesToInsert.push({
        collectionId: bscId,
        subCategoryId: null,
        s3Key: `collections/babyshower-card/${i + 1}.webp`,
        s3Url: `${S3_BASE}/collections/babyshower-card/${i + 1}.webp`,
        code: `BSC-${String(i + 1).padStart(3, "0")}`,
        title: `Babyshower Card Suite #${i + 1}`,
        details: "Premium printed baby shower invitation card with playful illustrations and custom liners.",
        sortOrder: i + 1,
      });
    }
  }

  // Vastupujan Invitation
  const vptId = createdCollectionsMap["vastupujan-invitation"];
  if (vptId) {
    for (let i = 0; i < 30; i++) {
      cardImagesToInsert.push({
        collectionId: vptId,
        subCategoryId: null,
        s3Key: `collections/vastupujan-invitation/${i + 1}.webp`,
        s3Url: `${S3_BASE}/collections/vastupujan-invitation/${i + 1}.webp`,
        code: `VPT-${String(i + 1).padStart(3, "0")}`,
        title: `Vastupujan Suite #${i + 1}`,
        details: "Premium animated Vastupujan video invitation with custom background track.",
        sortOrder: i + 1,
      });
    }
  }

  // Welcome Boards
  if (welcomeBoardColId) {
    for (const sub of WELCOME_BOARD_SUBCATEGORIES) {
      const subCatId = createdSubCategoriesMap[sub.slug];
      if (subCatId) {
        for (let i = 0; i < 30; i++) {
          cardImagesToInsert.push({
            collectionId: welcomeBoardColId,
            subCategoryId: subCatId,
            s3Key: `collections/welcome-board/${sub.slug}/${i + 1}.webp`,
            s3Url: `${S3_BASE}/collections/welcome-board/${sub.slug}/${i + 1}.webp`,
            code: `WBD-${sub.prefix}-${String(i + 1).padStart(3, "0")}`,
            title: `${sub.name} Welcome Board #${i + 1}`,
            details: `Premium customized ${sub.name} welcome board invitation for your special event.`,
            sortOrder: i + 1,
          });
        }
      }
    }
  }

  console.log(`🌱 Writing ${cardImagesToInsert.length} card images to database...`);
  await CardImage.insertMany(cardImagesToInsert);
  console.log("✅ Seed completed successfully!");

  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
