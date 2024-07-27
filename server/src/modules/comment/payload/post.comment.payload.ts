import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
} from "class-validator";
import { Schema, SchemaTypeOptions } from "mongoose";


export class PostCommentPayload {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  body: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  postId: string;
}
