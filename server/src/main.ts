import { NestFactory } from '@nestjs/core';
import AppModule from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fs from 'fs';
import * as morgan from 'morgan';

export const SWAGGER_API_ROOT = 'api/docs';
export const SWAGGER_API_NAME = 'API';
export const SWAGGER_API_DESCRIPTION = 'API Description';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('../secrets/server.key'),
    cert: fs.readFileSync('../secrets/server.crt'),
  };
  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.enableCors();
  app.use(morgan('combined'));

  await app.listen(process.env.APP_PORT || 9000);
}

bootstrap();