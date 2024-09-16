import mongoose ,{Schema,Document} from "mongoose";

export interface Cashflow extends Document {
    date: Date
    amount: number,
    type: string,
    category:  string ,
    description: string ,
    useremail:string
  }

const CashflowSchema: Schema<Cashflow>=new Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['inflow', 'outflow'], required: true },
    category: { type: String },
    description: { type: String },
    useremail:{type:String,required:true}
  },{timestamps:true})


const CashflowModel =
  (mongoose.models.Cashflow as mongoose.Model<Cashflow>) ||
  mongoose.model<Cashflow>('Cashflow', CashflowSchema);

export default CashflowModel;