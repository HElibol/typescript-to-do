import mongoose, { Schema, Document  } from "mongoose";

interface IRefreshToken extends Document{
    token: string,
    user: Schema.Types.ObjectId,
    expires: Date
}

const refreshTokenSchema = new Schema<IRefreshToken>({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        req: 'User',
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
});

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
