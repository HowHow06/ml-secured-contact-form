import { defineConfig } from 'drizzle-kit';
import config from './src/config/config';

export default defineConfig({
  schema: './src/db/schemas/index.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: config.db.host ?? '',
    user: config.db.user,
    password: config.db.password,
    database: config.db.database ?? '',
  },
});
