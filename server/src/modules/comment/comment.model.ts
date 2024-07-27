import { Schema, Document } from "mongoose";

export const Comment = new Schema({
  authorID: { type: Schema.Types.ObjectId, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  body: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface IComment extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly authorID: Schema.Types.ObjectId;
  readonly postId: Schema.Types.ObjectId;
  readonly body: string;
  readonly date: Date;
}
