import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mssql',
  host: configService.get('DB_HOST'),
  port: 1433,
  username: configService.get('DB_USER_NAME'),
  password: configService.get('DB_PASSWORD'),
  database: 'sale-phone',
  synchronize: false,
  logging: false,
  entities: ['dist/components/**/*.entity{.js,.ts}'],
  migrations: ['dist/database/migrations/*.js'],
  extra: {
    options: {
      encrypt: false,
    },
  },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
