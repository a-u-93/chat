import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('unpredictable secret'))
  await app.listen(process.env.PORT ?? 3000, process.env.ADDRESS ?? '10.7.0.1');
}
bootstrap();
