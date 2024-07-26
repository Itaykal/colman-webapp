import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { IBreed } from "./breed.model";
import { PostPostPayload } from "modules/post/payload/post.post.payload";


export interface IGenericMessageBody {
  message: string;
}


@Injectable()
export class BreedService {
  /**
   * Constructor
   * @param {Model<IPost>} postmodel
   */
  constructor(
    @InjectModel("Breed") private readonly breedmodel: Model<IBreed>,
  ) {}

  startsWith(name: string): Promise<IBreed[]> {
    return this.breedmodel.find({ "attributes.name": { $regex: `^${name}.*`, $options: "i" } }).limit(20).exec();
  }
}
