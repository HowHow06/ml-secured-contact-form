import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import config from 'src/config/config';
import * as schema from './schemas';

const connection = await mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  multipleStatements: config.db.multipleStatements,
});

export const db = drizzle(connection, { schema, mode: 'default' });
