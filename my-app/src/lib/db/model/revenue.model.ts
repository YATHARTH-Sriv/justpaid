import mongoose, { Schema, Document, Types } from "mongoose";

export interface Revenue extends Document {
  amount: number;
  date: Date;
  source: string;
  category?: string;  // Optional field
  description?: string;  // Optional field
  invoiceId?: Types.ObjectId;  // Optional field with correct ObjectId typing
  useremail:string,
  CurrentMonth:string
}

const RevenueSchema: Schema<Revenue> = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    source: { type: String, required: true },
    category: { type: String, default: null },
    description: { type: String, default: null },
    invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice", default: null },
    useremail:{type:String,required:true},
    CurrentMonth:{type:String,required:true}
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const RevenueModel =
  (mongoose.models.Revenue as mongoose.Model<Revenue>) ||
  mongoose.model<Revenue>("Revenue", RevenueSchema);

export default RevenueModel;
