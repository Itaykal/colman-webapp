import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IPost } from "./post.model";
import { PostPostPayload } from "../post/payload/post.post.payload";


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

  async create(payload: PostPostPayload, uid: string): Promise<IPost> {
    const createdPost = new this.postmodel({
      ...payload,
      imagePath: "",
      authorID: uid,
      date: new Date(),
      likes: 0,
    });
    return createdPost.save();
  }
}
