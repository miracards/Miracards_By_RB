import mongoose, { Schema, Document, Model } from "mongoose";

export type InquiryStatus = "new" | "read" | "replied" | "resolved";
export type InquirySource = "contact-form" | "whatsapp" | "phone";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  status: InquiryStatus;
  adminNotes: string;
  source: InquirySource;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "", trim: true },
    interest: { type: String, default: "General", trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "resolved"],
      default: "new",
    },
    adminNotes: { type: String, default: "" },
    source: {
      type: String,
      enum: ["contact-form", "whatsapp", "phone"],
      default: "contact-form",
    },
  },
  { timestamps: true }
);

InquirySchema.index({ status: 1, createdAt: -1 });
InquirySchema.index({ createdAt: -1 });

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
export default Inquiry;
