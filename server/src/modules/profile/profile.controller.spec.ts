// FILEPATH: /home/itay/projects/colman-webapp/server/src/modules/profile/profile.controller.spec.ts

import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import AppModule from "../app/app.module";
import * as request from "supertest";
import { ProfileModule } from "./profile.module";
import * as jwt_decode from "jwt-decode";
import { IProfile } from "./profile.model";
import { MongooseModule, MongooseModuleFactoryOptions } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";

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
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
        AppModule,
        ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const profile: Model<IProfile> = moduleFixture.get("Profile");
    profile.deleteMany({}).exec();

    const res = await request(app.getHttpServer())
      .post("/api/auth/register")
      .send(user);

    accessToken = res.body.token;
    console.log(res.body);

    const payloadJson = jwt_decode.jwtDecode(accessToken) as IProfile;
    uid = String(payloadJson._id);
  });

  it("/api/profile/:userId (GET)", () => {
    return request(app.getHttpServer())
      .get(`/api/profile/${uid}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .expect(user);
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
