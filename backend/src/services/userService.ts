import { and, eq, isNull, sql } from 'drizzle-orm';
import { db } from 'src/db/connection';
import { InsertUser, SelectUser, users } from 'src/db/schemas';
import authUtil from 'src/utils/authUtil';
import { AUTH_MAX_ATTEMPTS } from 'src/utils/constants';

const getUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), isNull(users.deletedAt)))
    .limit(1);
  return user.length ? user[0] : null;
};

const getUserByUuid = async (uuid: string) => {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, uuid), isNull(users.deletedAt)))
    .limit(1);
  return user.length ? user[0] : null;
};

const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await createUser({
    email: email,
    hashedPassword: await authUtil.hashPassword(password),
  });
};

const createUser = async (newUser: InsertUser) => {
  return await db.insert(users).values(newUser);
};

const getUserBlockedAt = async (email: string) => {
  const blockedAtResult = await db
    .select({
      blockedAt: users.blockedAt,
    })
    .from(users)
    .where(and(eq(users.email, email), isNull(users.deletedAt)));

  return blockedAtResult[0]?.blockedAt;
};

const handleFailedLogin = async (user: SelectUser) => {
  const newLoginAttempt = (user.loginTrial || 0) + 1;
  await db
    .update(users)
    .set({
      loginTrial: newLoginAttempt,
      ...(newLoginAttempt >= AUTH_MAX_ATTEMPTS && {
        blockedAt: sql`CURRENT_TIMESTAMP`,
      }),
    })
    .where(eq(users.pk, user.pk));
};

const resetLoginTrial = async (user: SelectUser) => {
  await db
    .update(users)
    .set({
      loginTrial: 0,
      blockedAt: null,
    })
    .where(eq(users.pk, user.pk));
};

const updateUser = async (user: SelectUser) => {
  const { pk, ...restFields } = user;
  await db
    .update(users)
    .set({
      ...restFields,
    })
    .where(eq(users.pk, pk));
};

const extractUserProfile = (user: SelectUser) => {
  const { id, email, fullname, dob, nric } = user;
  return {
    id,
    email,
    fullname,
    dob,
    nric,
  };
};

export default {
  getUserByEmail,
  createUser,
  registerUser,
  getUserBlockedAt,
  handleFailedLogin,
  resetLoginTrial,
  getUserByUuid,
  updateUser,
  extractUserProfile,
};
