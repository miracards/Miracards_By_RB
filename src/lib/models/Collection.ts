import mongoose, { Schema, Document, Model } from "mongoose";

export type MenuCategory =
  | "invitation-category"
  | "welcome-board"
  | "wedding-itinerary"
  | "video-invitation";

export interface ICollection extends Document {
  slug: string;
  title: string;
  description: string;
  type: "Print" | "Digital";
  style: "Traditional" | "Luxury" | "Modern";
  menuCategory: MenuCategory;
  coverImage: string;
  count: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    type: { type: String, enum: ["Print", "Digital"], required: true },
    style: { type: String, enum: ["Traditional", "Luxury", "Modern"], required: true },
    menuCategory: {
      type: String,
      enum: ["invitation-category", "welcome-board", "wedding-itinerary", "video-invitation"],
      default: "invitation-category",
    },
    coverImage: { type: String, default: "" },
    count: { type: String, default: "0 Designs" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Collection: Model<ICollection> =
  mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema);
export default Collection;
