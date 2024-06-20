import { sql } from 'drizzle-orm';
import {
  date,
  mysqlTable,
  serial,
  text,
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
  hashed_password: text('hashed_password').notNull(),
  fullname: varchar('fullname', { length: 255 }),
  dob: date('dob'),
  nric: varchar('nric', { length: 20 }),
  ...timestamps,
});
