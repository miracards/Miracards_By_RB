import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ICardImage extends Document {
  collectionId: Types.ObjectId;
  subCategoryId: Types.ObjectId | null;
  s3Key: string;
  s3Url: string;
  code: string;
  title: string;
  details: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CardImageSchema = new Schema<ICardImage>(
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

const CardImage: Model<ICardImage> =
  mongoose.models.CardImage || mongoose.model<ICardImage>("CardImage", CardImageSchema);
export default CardImage;
