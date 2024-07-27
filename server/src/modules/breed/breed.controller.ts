import {
  Controller,
  Get,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BreedService } from "./breed.service";
import { IBreed } from "./breed.model";


@ApiBearerAuth()
@ApiTags("breed")
@Controller("api/breed")
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiResponse({ status: 200, description: "Fetch Post Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Post Request Failed" })
  async search(@Query('query') query?: string): Promise<Array<IBreed>> {
    if (!query) {
      query = ""
    }
    const posts = await this.breedService.startsWith(query);
    return posts;
  }
}