import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";

process.env.TEST

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: process.env.NODE_ENV === "test" ? new ConfigService(".env.test"): new ConfigService(".env"),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
