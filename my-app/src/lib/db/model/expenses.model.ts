import mongoose, { Schema, Document } from "mongoose";

export interface Expense extends Document {
  startingdate: Date;
  amount: number;
  title: string;
  description: string;
  useremail: string;
}

// Define the schema
const ExpenseSchema: Schema<Expense> = new Schema(
  {
    startingdate: { type: Date, required: true },
    amount: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    useremail: { type: String, required: true },
  },
  { timestamps: true }
);

// Check if the model already exists, and if not, define it
const ExpenseModel =
  (mongoose.models.Expenses as mongoose.Model<Expense>) ||
  mongoose.model<Expense>("Expenses", ExpenseSchema);

export default ExpenseModel;
