import { sql } from 'drizzle-orm';
import {
  date,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { timestamps } from './base';

export const users = mysqlTable('users', {
  pk: serial('pk').primaryKey(),
  id: varchar('id', { length: 191 })
    .default(sql`(uuid())`)
    .unique()
    .notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  hashedPassword: text('hashed_password').notNull(),
  fullname: varchar('fullname', { length: 255 }),
  dob: date('dob'),
  nric: varchar('nric', { length: 20 }),
  loginTrial: int('login_trial').default(0),
  blockedAt: timestamp('blocked_at'),
  ...timestamps,
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
