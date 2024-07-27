import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
} from "class-validator";


export class EditCommentPayload {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  body: string;
}
