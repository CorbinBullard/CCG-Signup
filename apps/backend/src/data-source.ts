// data-source.ts
import { config } from 'dotenv';
config();

import appConfig from './config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { join } from 'path';

console.log(join(__dirname, 'dist/src/**/*.entity.js'));

const dbConfig: PostgresConnectionOptions | SqliteConnectionOptions =
  appConfig().database;

export const AppDataSource = new DataSource({
  ...dbConfig,
  entities: ['dist/src/**/*.entity.js'],
});

console.log(AppDataSource);
