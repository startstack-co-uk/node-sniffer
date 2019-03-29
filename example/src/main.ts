import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initialize } from 'simple-request-tracker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  initialize(__dirname + '/database.sqlite', app.getHttpAdapter().getInstance());
}
bootstrap();
