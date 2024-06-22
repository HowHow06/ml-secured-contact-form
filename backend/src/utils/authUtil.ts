import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'src/config/config';
import { AUTH_MAX_AGE_IN_SECOND } from './constants';

async function hashPassword(password: string) {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

async function verifyPassword(password: string, hash: string) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

async function createAuthToken(userUuid: string) {
  return jwt.sign({ id: userUuid }, config.tokenSecret, {
    expiresIn: AUTH_MAX_AGE_IN_SECOND,
  });
}

export default {
  hashPassword,
  verifyPassword,
  createAuthToken,
};
