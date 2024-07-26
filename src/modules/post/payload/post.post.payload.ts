import { ApiProperty } from "@nestjs/swagger";
import { Express } from "express";
import {
  IsNotEmpty,
} from "class-validator";


export class PostPostPayload {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  body: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  imagePath: string;
}
