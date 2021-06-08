import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('App created');
  await app.listen(3000);
  console.log('server started at port: 3000');
}
bootstrap();
