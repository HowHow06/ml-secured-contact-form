import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __currentFilename = fileURLToPath(import.meta.url);
const __currentDirname = path.dirname(__currentFilename);
dotenv.config({ path: path.join(__currentDirname, '../../../.env') });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  backendCorsOrigins: process.env.BACKEND_CORS_ORIGINS,
  tokenSecret: process.env.TOKEN_SECRET || '',
  db: {
    host: process.env.MYSQL_SERVER as string,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
  },
};

export default config;
