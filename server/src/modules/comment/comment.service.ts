import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IComment } from "./comment.model";
import { PostCommentPayload } from "./payload/post.comment.payload";
import { EditCommentPayload } from "./payload/edit.comment.payload";


export interface IGenericMessageBody {
  message: string;
}


@Injectable()
export class CommentService {
  constructor(
    @InjectModel("Comment") private readonly commentModel: Model<IComment>,
  ) {}

  get(id: string): Promise<IComment> {
    return this.commentModel.findById(id).exec();
  }

  getByPostID(id: string): Promise<Array<IComment>> {
    return this.commentModel.find({ postId: id }).sort({'date': -1}).exec();
  }

  async edit(id: string, payload: EditCommentPayload): Promise<IComment> {
    const comment = await this.commentModel.findByIdAndUpdate({ _id: id }, { ...payload }, {new: true}).exec();
    if (!comment) {
      throw new NotAcceptableException("Comment not found");
    }
    return comment
  }

  async create(payload: PostCommentPayload, uid: string): Promise<IComment> {
    const createdPost = new this.commentModel({...payload, authorID: uid, date: new Date()});
    return createdPost.save();
  }
}
