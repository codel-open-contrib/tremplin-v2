declare const process: any;

const db = {
    type: 'postgres' as const,
    host: process.env.DATABASE_HOST || 'postgres',
    port: Number(process.env.DATABASE_PORT || 5432),
    username: process.env.DATABASE_USER || 'tremplin',
    password: process.env.DATABASE_PASSWORD || 'dev_password_123',
    database: process.env.DATABASE_NAME || 'tremplin_dev',
    autoLoadEntities: true,
    synchronize: true,
}

export default db;