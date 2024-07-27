import { describe, jest, beforeEach, expect, it } from "@jest/globals";
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Types } from "mongoose";
import { AppModule } from "../app/app.module";
import request from "supertest";


describe('ProfileController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })
  const expectedProfileID: Types.ObjectId = new Types.ObjectId("66a50ada70edde38cfa85455")

  describe('getProfile', () => {
    it('should return a profile', () => {
      return request(app.getHttpServer())
        .get('/api/profile/test')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveProperty("_id", expectedProfileID);
        });
    });

    it('should throw a BadRequestException if the profile is not found', () => {
      return request(app.getHttpServer())
        .get('/api/profile/notexistinguser')
        .expect(400)
    });
  });

  // describe('patchProfile', () => {
  //   it('should update the profile and return it', async () => {
  //     const result = await controller.patchProfile({ username: 'testuser', email: 'test@example.com' });
  //     expect(result).toEqual(mockProfile);
  //     expect(service.edit).toHaveBeenCalledWith({ username: 'testuser', name: 'Updated User' });
  //   });
  // });
});
