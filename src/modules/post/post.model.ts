import { Schema, Document } from "mongoose";

/**
 * Mongoose Post Schema
 */
export const Post = new Schema({
  authorID: { type: Schema.Types.ObjectId, required: true },
  imagePath: { type: String, required: true },
  body: { type: String, required: true },
  likes: { type: Number, default: 0 },
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface IPost extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly authorID: Schema.Types.ObjectId;
  readonly imagePath: string;
  readonly body: string;
  readonly likes: number;
  readonly date: Date;
}
