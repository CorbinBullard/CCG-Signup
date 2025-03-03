import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes unexpected properties
      forbidNonWhitelisted: true, // throws errors on unexpected properties
      transform: true, // enables transformation using class-transformer
    }),
  );
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
