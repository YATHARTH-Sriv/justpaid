import mongoose ,{Schema,Document} from "mongoose";

export interface Invoice extends Document {
    invoiceId: string;
    client: string;
    amount: number,
    status:string,
    useremail:string
  }

const InvoiceSchema: Schema<Invoice>=new Schema({
    invoiceId: { type: String, required: true },
    client: { type: String, required: true },
    amount:{ type: Number,required:true},
    status:{type:String,required:true},
    useremail:{type:String,required:true}
  },{timestamps:true})


const InvoiceModel =
  (mongoose.models.Invoice as mongoose.Model<Invoice>) ||
  mongoose.model<Invoice>('Invoice', InvoiceSchema);

export default InvoiceModel;