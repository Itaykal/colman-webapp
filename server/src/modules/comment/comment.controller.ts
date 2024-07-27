import {
  Body,
  Controller,
  Get,
  Param,
  Req,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CommentService } from "./comment.service";
import { PostCommentPayload } from "./payload/post.comment.payload";
import { IComment } from "./comment.model";
import { PostService } from "modules/post/post.service";

@ApiBearerAuth()
@ApiTags("comment")
@Controller("api/comment")
export class CommentController {
  constructor(private readonly commentService: CommentService, private readonly postService: PostService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/:postId")
  @ApiResponse({ status: 200, description: "Fetch Post Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Post Request Failed" })
  async getPostsComments(@Param("postId") postId: string): Promise<Array<IComment>> {
    const posts = await this.commentService.getByPostID(postId);
    return posts;
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  @ApiResponse({ status: 201, description: "Post Comment Request Received" })
  @ApiResponse({ status: 400, description: "Post Comment Request Failed" })
  async postComment(
    @Body() payload: PostCommentPayload,
    @Req() req: any,
  ): Promise<IComment> {
    const comment = this.commentService.create(payload, req.user._id);
    this.postService.incrementComments(payload.postId);
    return comment;
  }
}
