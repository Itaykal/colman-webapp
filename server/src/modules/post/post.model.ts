import { Schema, Document } from "mongoose";

/**
 * Mongoose Post Schema
 */
export const Post = new Schema({
  authorID: { type: Schema.Types.ObjectId, required: true },
  imageUrl: { type: String, required: true },
  body: { type: String, required: true },
  breedId: { type: String, required: true },
  comments: { type: Number, default: 0 },
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface IPost extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly authorID: Schema.Types.ObjectId;
  readonly imageUrl: string;
  readonly breedId: string;
  readonly body: string;
  readonly comments: number;
  readonly date: Date;
}
