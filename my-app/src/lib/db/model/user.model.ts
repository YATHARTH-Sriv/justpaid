import mongoose ,{Schema,Document} from "mongoose";

export interface User extends Document{
    name: string,
    quickbooksId: string,
    accessToken: string,
    refreshToken?: string,
    createdAt: Date,
    
}

const UserSchema: Schema<User>=new Schema({
    name: {
        type: String,
        required: true,
      },
    quickbooksId: {
        type: String,
        unique: true,
        required: true,
      },
    accessToken: {
        type: String,
        required: true,
      },
    refreshToken: {
        type: String,
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;