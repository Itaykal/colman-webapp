import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IPost } from "./post.model";
import { PostPostPayload } from "../post/payload/post.post.payload";
import { EditPostPayload } from "./payload/edit.post.payload";


export interface IGenericMessageBody {
  message: string;
}


@Injectable()
export class PostService {
  /**
   * Constructor
   * @param {Model<IPost>} postmodel
   */
  constructor(
    @InjectModel("Post") private readonly postmodel: Model<IPost>,
  ) {}

  get(id: string): Promise<IPost> {
    return this.postmodel.findById(id).exec();
  }

  getAll(): Promise<Array<IPost>> {
    return this.postmodel.find().exec();
  }

  getByUser(id: string): Promise<Array<IPost>> {
    return this.postmodel.find({ authorID: id }).exec();
  }

  incrementComments(id: string): Promise<IPost> {
    return this.postmodel
      .findByIdAndUpdate(id, { $inc: { comments: 1 } })
      .exec();
  }

  async create(payload: PostPostPayload, uid: string): Promise<IPost> {
    const createdPost = new this.postmodel({
      ...payload,
      authorID: uid,
      date: new Date(),
      comments: 0,
    });
    return createdPost.save();
  }
  
  async edit(payload: EditPostPayload, id: string): Promise<IPost> {
    const post = await this.postmodel.findOneAndUpdate({
      _id: id,
    }, {
      ...payload,
    }, {
      new: true,
    }).exec();
    
    if (!post) {
      throw new NotAcceptableException("Post not found");
    }

    return post;
  }
}
