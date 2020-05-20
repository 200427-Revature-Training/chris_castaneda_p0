import { Pool } from 'pg';
/**Database pool connection */

export const dbConnection = new Pool({//Create db connection pool
    database: 'postgres',
    host: process.env.BLOG_APP_URL,
    port: 5432,
    user: process.env.BLOG_APP_ROLE,
    password: process.env.BLOG_APP_PASSWORD
});