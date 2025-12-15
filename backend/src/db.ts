import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const db: TypeOrmModuleOptions = {
  type: 'postgres' as const,
  host: (process.env.DATABASE_HOST as string) || 'postgres',
  port: parseInt((process.env.DATABASE_PORT as string) || '5432', 10),
  username: (process.env.DATABASE_USER as string) || 'tremplin',
  password: (process.env.DATABASE_PASSWORD as string) || 'dev_password_123',
  database: (process.env.DATABASE_NAME as string) || 'tremplin_dev',
  autoLoadEntities: true,
  synchronize: (process.env.NODE_ENV as string) !== 'production',
};

export default db;