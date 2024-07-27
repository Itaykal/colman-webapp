import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
} from "class-validator";

/**
 * Register Payload Class
 */
export class RefreshTokenPayload {
    @ApiProperty({required: true})
    @IsNotEmpty()
    refreshToken: string;

}