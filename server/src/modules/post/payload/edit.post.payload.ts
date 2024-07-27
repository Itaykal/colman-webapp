import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
} from "class-validator";


export class EditPostPayload {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  body?: string;

  @ApiProperty()
  breedId?: string;

  @ApiProperty()
  imageUrl?: string;
}