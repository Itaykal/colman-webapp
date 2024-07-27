import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Delete,
} from "@nestjs/common";
import { extname } from "path";
import * as multer from "multer";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { PostService, IGenericMessageBody } from "./post.service";
import { PostPostPayload } from "./payload/post.post.payload";
import { EditPostPayload } from "./payload/edit.post.payload";
import { IPost } from "./post.model";
import { ObjectId } from "mongoose";

@ApiBearerAuth()
@ApiTags("post")
@Controller("api/post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  @ApiResponse({ status: 200, description: "Fetch Post Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Post Request Failed" })
  async getAllPosts(): Promise<Array<IPost>> {
    const posts = await this.postService.getAll();
    return posts;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  @ApiResponse({ status: 200, description: "Fetch Post Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Post Request Failed" })
  async getPost(@Param("id") id: string): Promise<IPost> {
    const post = await this.postService.get(id);
    return post;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("user/:id")
  @ApiResponse({ status: 200, description: "Fetch Post Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Post Request Failed" })
  async getPostsByUser(@Param("id") id: string): Promise<Array<IPost>> {
    const posts = await this.postService.getByUser(id);
    return posts;
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  @ApiResponse({ status: 200, description: "Create Post Request Received" })
  @ApiResponse({ status: 400, description: "Create Post Request Failed" })
  async createPost(
    @Req() req,
    @Body() payload: PostPostPayload,
  ): Promise<IPost> {
    try {
      const uid = req.user.id;
      const post = await this.postService.create(payload, uid);
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiConsumes("multipart/form-data")
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }
  )
  @UseInterceptors(FileInterceptor("file",
    {
      storage: multer.diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const filename = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, filename + extname(file.originalname));
        },
      }),
    }
  ))
  @Post("/upload-file")
  async uploadFile(@Req() req): Promise<string> {
    return `/public/${req.file.filename}`;
  }


  @Post("/:postId/edit")
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Edit Post Request Received" })
  @ApiResponse({ status: 400, description: "Edit Post Request Failed" })
  async editPost(
    @Param("postId") postId: string,
    @Body() payload: EditPostPayload,
    @Req() req,
  ): Promise<IPost> {
    try {
      const originalPost = await this.postService.get(postId);
      if (!originalPost) {
        throw new BadRequestException("Post not found");
      }
      if (String(originalPost.authorID) !== String(req.user._id)) {
        throw new BadRequestException("You are not the author of this post");
      }
      const post = await this.postService.edit(payload, postId);
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))

  @ApiResponse({ status: 200, description: "Delete Post Request Received" })
  @ApiResponse({ status: 400, description: "Delete Post Request Failed" })
  async deletePost(@Param("id") id: string): Promise<IGenericMessageBody> {
    try {
      const post = await this.postService.delete(id);
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
