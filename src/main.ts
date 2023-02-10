import { APIPrefix } from './constants/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APIPrefix.VERSION);
  await app.listen(3000);
}
bootstrap();
