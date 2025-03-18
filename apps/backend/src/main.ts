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
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credntials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });
  app.setGlobalPrefix('api', {
    exclude: [''],
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
