import { NestFactory } from '@nestjs/core';
import AppModule from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as morgan from 'morgan';

export const SWAGGER_API_ROOT = 'api/docs';
export const SWAGGER_API_NAME = 'API';
export const SWAGGER_API_DESCRIPTION = 'API Description';

async function bootstrap() {
  var app;
  if (process.env.NODE_ENV === 'production') {
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, "..", "secrets", "server.key")),
      cert: fs.readFileSync(path.join(__dirname, "..", "secrets", "server.crt")),
    };
    app = await NestFactory.create(AppModule, {httpsOptions});
  } else {
    app = await NestFactory.create(AppModule);
  }
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