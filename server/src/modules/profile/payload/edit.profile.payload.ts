import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
} from "class-validator";


export class EditProfilePayload {
  @ApiProperty()
  @IsAlphanumeric()
  username?: string;

  @ApiProperty()
  avatar?: string;
}
