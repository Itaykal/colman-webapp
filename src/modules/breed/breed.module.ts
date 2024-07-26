import { Module } from "@nestjs/common";
import { BreedService } from "./breed.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Breed } from "./breed.model";
import { BreedController } from "./breed.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Breed", schema: Breed }])],
  providers: [BreedService],
  exports: [BreedService],
  controllers: [BreedController],
})
export class BreedModule {}
