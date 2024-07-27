import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  Injectable,
} from "@nestjs/common";
import { IComment } from "./comment.model";
import { PostCommentPayload } from "./payload/post.comment.payload";


export interface IGenericMessageBody {
  message: string;
}


@Injectable()
export class CommentService {
  constructor(
    @InjectModel("Comment") private readonly commentModel: Model<IComment>,
  ) {}

  getByPostID(id: string): Promise<Array<IComment>> {
    return this.commentModel.find({ postId: id }).sort({'date': -1}).exec();
  }

  async create(payload: PostCommentPayload, uid: string): Promise<IComment> {
    const createdPost = new this.commentModel({...payload, authorID: uid, date: new Date()});
    return createdPost.save();
  }
}
