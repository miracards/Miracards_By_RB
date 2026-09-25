import mongoose, { Schema, Model } from "mongoose";

export interface IPageView {
  slug: string;
  date: string; // "YYYY-MM-DD"
  count: number;
}

const PageViewSchema = new Schema<IPageView>(
  {
    slug: { type: String, required: true, index: true },
    date: { type: String, required: true }, // daily bucket
    count: { type: Number, default: 0 },
  },
  { timestamps: false }
);

// One document per (slug, date) pair
PageViewSchema.index({ slug: 1, date: 1 }, { unique: true });

const PageView: Model<IPageView> =
  mongoose.models.PageView || mongoose.model<IPageView>("PageView", PageViewSchema);

export default PageView;
