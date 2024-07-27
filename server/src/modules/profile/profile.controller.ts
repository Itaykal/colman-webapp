import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ACGuard, UseRoles } from "nest-access-control";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileService, IGenericMessageBody } from "./profile.service";
import { EditProfilePayload } from "./payload/edit.profile.payload";
import { IProfile } from "./profile.model";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { extname } from "path";

@ApiBearerAuth()
@ApiTags("profile")
@Controller("api/profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(":userId")
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Fetch Profile Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Profile Request Failed" })
  async getProfile(@Param("userId") userId: string): Promise<IProfile> {
    const profile = await this.profileService.get(userId);
    if (!profile) {
      throw new BadRequestException(
        "The profile with that username could not be found.",
      );
    }
    return profile;
  }

  /**
   * Edit a profile
   * @param {RegisterPayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  @Post("edit")
  @UseGuards(AuthGuard("jwt"))
  @UseRoles({
    resource: "profiles",
    action: "update",
    possession: "any",
  })
  @ApiResponse({ status: 200, description: "Patch Profile Request Received" })
  @ApiResponse({ status: 400, description: "Patch Profile Request Failed" })
  async patchProfile(
    @Body() payload: EditProfilePayload,
    @Param("userId") userId: string,
    @Req() req,
  ) {
    const uid = req.user.id;
    return await this.profileService.edit(payload, uid);
  }

  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.diskStorage({
        destination: "./public/avatar",
        filename: (req, file, cb) => {
          const filename = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, filename + extname(file.originalname));
        },
      }),
    }),
  )
  @Post("/upload-file")
  async uploadFile(@Req() req): Promise<string> {
    return `/public/avatar/${req.file.filename}`;
  }
}
