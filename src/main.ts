import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV == 'prodLocal') {
    app.enableCors({
      origin: 'http://localhost:5000',
      credentials: true,
    });
  } else if (process.env.NODE_ENV != 'production') {
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
  }

  app.use(cookieParser());

  await app.listen(process.env.APP_PORT);
}
bootstrap();
