import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes unexpected properties
      forbidNonWhitelisted: false, // throws errors on unexpected properties
      transform: true, // enables transformation using class-transformer
    }),
  );
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://10.0.2.2:8000', // android emulator accessing backend on host machine
      'http://localhost:8081',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });
  app.setGlobalPrefix('api', {
    exclude: [''],
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
