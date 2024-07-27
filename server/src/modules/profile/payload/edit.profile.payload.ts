import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  Matches,
} from "class-validator";


export class EditProfilePayload {
  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsAlphanumeric()
  username?: string;

  @ApiProperty()
  @Matches(/^[a-zA-Z ]+$/)
  name?: string;

  @ApiProperty()
  @MinLength(8)
  password?: string;

  @ApiProperty()
  avatar?: string;
}
