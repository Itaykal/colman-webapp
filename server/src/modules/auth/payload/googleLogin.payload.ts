import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GoogleAuthPayload {
    @ApiProperty({required: true})
    @IsNotEmpty()
    credential: string;
  }
  
  