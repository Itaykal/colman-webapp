import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  Matches,
} from "class-validator";

/**
 * Patch Profile Payload Class
 */
export class PatchProfilePayload {
  /**
   * Email field
   */
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Username field
   */
  @ApiProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  /**
   * Name field
   */
  @ApiProperty()
  @Matches(/^[a-zA-Z ]+$/)
  name: string;

  /**
   * Password field
   */
  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  avatar: string;
}
