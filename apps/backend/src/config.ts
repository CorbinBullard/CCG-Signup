import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  cors: {
    origin: isProd
      ? [process.env.BASE_URL, process.env.APP_BASE_URL] // Production CORS URLs
      : ['http://localhost:3000', 'http://localhost:8081'], // Dev CORS URLs
  },
  database: isProd
    ? {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        migrations: ['dist/migrations/*.js'],
        migrationsTableName: 'migrations',
      }
    : {
        type: 'sqlite',
        database: 'db/dev.db',
        synchronize: true,
      },
}));
