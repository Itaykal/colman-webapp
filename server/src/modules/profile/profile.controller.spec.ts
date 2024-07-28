// FILEPATH: /home/itay/projects/colman-webapp/server/src/modules/profile/profile.controller.spec.ts

import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import AppModule from "../app/app.module";
import * as request from "supertest";
import { ProfileModule } from "./profile.module";
import * as jwt_decode from "jwt-decode";
import { IProfile } from "./profile.model";
import { getConnectionToken, MongooseModule, MongooseModuleFactoryOptions } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AuthModule } from "../auth/auth.module";

describe("ProfileController (e2e)", () => {
  let app: INestApplication;
  let accessToken: string;
  let uid: string;

  const user = {
    username: "test",
    email: "test@gmail.com",
    password: "test",
    avatar: "test",
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) =>
            ({
              uri: configService.get("DB_URL"),
              useNewUrlParser: true,
              useUnifiedTopology: true,
            } as MongooseModuleFactoryOptions),
          }),
        ProfileModule,
        AuthModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(3333);
    await (app.get(getConnectionToken()) as Connection).db.collection('profiles').deleteMany({});

    const res = await request(app.getHttpServer())
      .post("/api/auth/register")
      .send(user);

    accessToken = res.body.token;

    const payloadJson = jwt_decode.jwtDecode(accessToken) as IProfile;
    uid = String(payloadJson._id);
  });

  afterEach(async () => {
    await app.close();
  });

  it("/api/profile/:userId (GET)", () => {
    return request(app.getHttpServer())
      .get(`/api/profile/${uid}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });

  it("/api/profile/edit (POST)", () => {
    const editProfilePayload = { username: "updatedtest" };
    return request(app.getHttpServer())
      .post("/api/profile/edit")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(editProfilePayload)
      .expect(201)
      .expect((res) => {
        expect(res.body.username).toEqual("updatedtest");
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
