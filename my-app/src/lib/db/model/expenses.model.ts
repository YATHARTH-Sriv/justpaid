import mongoose ,{Schema,Document} from "mongoose";

export interface Expense extends Document {
    startingdate: Date
    amount: number,
    title: string,
    description: string ,
    useremail:string
  }

const ExpenseSchema: Schema<Expense>=new Schema({
    startingdate: { type: Date, required: true },
    amount: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    useremail:{type:String,required:true}
  },{timestamps:true})


const ExpenseModel =
  (mongoose.models.Expense as mongoose.Model<Expense>) ||
  mongoose.model<Expense>('Cashflow', ExpenseSchema);

export default ExpenseModel;