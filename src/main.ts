import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV != 'production') {
    app.enableCors({
      origin: /http:\/\/localhost:*/,
      credentials: true,
    });
  }

  app.use(cookieParser());

  await app.listen(5000);
}
bootstrap();
