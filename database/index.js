import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env || {};

export default new pg.Pool({
    user: env.POSTGRES_USER,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DB,
    password: env.POSTGRES_PASSWORD,
    port: env.POSTGRES_PORT,
});
