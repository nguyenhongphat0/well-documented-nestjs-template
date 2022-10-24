import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Admin } from './admin/entities/admin.entity';
import config from './config';
import { User } from './users/entities/user.entity';

ConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Admin],
  subscribers: [],
};

export const AppDataSource = new DataSource({
  ...dataSourceOptions,
  migrations: ['src/migrations/*{.ts,.js}'],
});
