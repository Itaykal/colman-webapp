import * as crypto from "crypto";
import * as gravatar from "gravatar";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IProfile } from "./profile.model";
import { RegisterPayload } from "../auth/payload/register.payload";
import { AppRoles } from "../app/app.roles";
import { EditProfilePayload } from "./payload/edit.profile.payload";
import { CustomError } from 'ts-custom-error'


export class UserAlreadyExists extends CustomError {
  public constructor(
      message?: string,
  ) {
      super(message)
  }
}

export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

/**
 * Profile Service
 */
@Injectable()
export class ProfileService {
  /**
   * Constructor
   * @param {Model<IProfile>} profileModel
   */
  constructor(
    @InjectModel("Profile") private readonly profileModel: Model<IProfile>,
  ) {}

  /**
   * Fetches a profile from database by UUID
   * @param {string} id
   * @returns {Promise<IProfile>} queried profile data
   */
  get(id: string): Promise<IProfile> {
    return this.profileModel.findById(id).exec();
  }

  /**
   * Fetches a profile from database by username
   * @param {string} username
   * @returns {Promise<IProfile>} queried profile data
   */
  getByUsername(username: string): Promise<IProfile> {
    return this.profileModel.findOne({ username }).exec();
  }

  /**
   * Fetches a profile by their username and hashed password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<IProfile>} queried profile data
   */
  getByUsernameAndPass(username: string, password: string): Promise<IProfile> {
    return this.profileModel
      .findOne({
        username,
        password: crypto.createHmac("sha256", password).digest("hex"),
      })
      .exec();
  }
  
  getByEmail(email: string): Promise<IProfile> {
    return this.profileModel
    .findOne({
      email: email
    })
    .exec();
  }

  /**
   * Create a profile with RegisterPayload fields
   * @param {RegisterPayload} payload profile payload
   * @returns {Promise<IProfile>} created profile data
   */
  async create(payload: RegisterPayload): Promise<IProfile> {
    const user = await this.getByUsername(payload.username);
    if (user) {
      throw new NotAcceptableException(
        "The account with the provided username currently exists. Please choose another one.",
      );
    }

    const email = await this.getByEmail(payload.email);
    if (email) {
      throw new UserAlreadyExists(
        "The account with the provided email currently exists. Please choose another one.",
      );
    }

    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac("sha256", payload.password).digest("hex"),
      avatar: gravatar.url(payload.email, {
        protocol: "http",
        s: "200",
        r: "pg",
        d: "404",
      }),
      roles: AppRoles.DEFAULT,
    });

    return createdProfile.save();
  }

  /**
   * Edit profile data
   * @param {PatchProfilePayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  async edit(payload: EditProfilePayload, uid: string): Promise<IProfile> {
    const doesUserAlreadyExist = await this.getByUsername(payload.username);
    if (doesUserAlreadyExist) {
      throw new NotAcceptableException(
        "The account with the provided username currently exists. Please choose another one.",
      );
    }
    const updatedProfile = await this.profileModel.findOneAndUpdate({ _id: uid }, payload, {
      new: true,
    }).exec();
    if (!updatedProfile) {
      throw new BadRequestException(
        "User not found",
      );
    }
    return this.get(uid);
  }

  /**
   * Delete profile given a username
   * @param {string} username
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(username: string): Promise<IGenericMessageBody> {
    return this.profileModel.deleteOne({ username }).then(profile => {
      if (profile.deletedCount === 1) {
        return { message: `Deleted ${username} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a profile by the name of ${username}.`,
        );
      }
    });
  }
}
