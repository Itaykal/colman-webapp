import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
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
import { IPost } from "./post.model";

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
    return req.file.filename;
  }
}
