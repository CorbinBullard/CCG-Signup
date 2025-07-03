// data-source.ts
import { config } from 'dotenv';
config();

import appConfig from './config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const dbConfig: PostgresConnectionOptions | SqliteConnectionOptions =
  appConfig().database;

export const AppDataSource = new DataSource({
  ...dbConfig,
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // explicitly set the path
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});

console.log(AppDataSource);
