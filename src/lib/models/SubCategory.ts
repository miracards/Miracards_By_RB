import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ISubCategory extends Document {
  collectionId: Types.ObjectId;
  slug: string;
  name: string;
  prefix: string;
  coverImage: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
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

const SubCategory: Model<ISubCategory> =
  mongoose.models.SubCategory || mongoose.model<ISubCategory>("SubCategory", SubCategorySchema);
export default SubCategory;
