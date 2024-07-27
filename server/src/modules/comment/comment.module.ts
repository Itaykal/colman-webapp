import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { Comment } from "./comment.model";
import { PostModule } from "modules/post/post.module";

@Module({
  imports: [PostModule, MongooseModule.forFeature([{ name: "Comment", schema: Comment }])],
  providers: [CommentService],
  exports: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
