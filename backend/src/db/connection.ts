import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import config from 'src/config/config';
import logger from 'src/utils/logger';
import * as schema from './schemas';

const MAX_RETRIES = 5;
let retries = 0;

const connectWithRetry = async (): Promise<ReturnType<
  typeof drizzle
> | void> => {
  try {
    logger.info('Attempting to connect to the database...');
    const connection = await mysql.createConnection({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      multipleStatements: config.db.multipleStatements,
    });
    logger.info('Database connection successful');
    return drizzle(connection, { schema, mode: 'default' });
  } catch (err) {
    retries += 1;
    logger.error(`Database connection failed (attempt ${retries}):`, err);
    if (retries < MAX_RETRIES) {
      logger.warn(
        `Retrying connection in 5 seconds... (${retries}/${MAX_RETRIES})`,
      );
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectWithRetry();
    } else {
      logger.error('Max retries reached. Exiting...');
      process.exit(1);
    }
  }
};

export const db = await connectWithRetry();
