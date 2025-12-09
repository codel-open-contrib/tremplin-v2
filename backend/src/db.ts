const db = {
    type: 'postgres' as const,
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'pass12890',
    database: 'e_db',
    autoLoadEntities: true,
    synchronize: true,
}

export default db;