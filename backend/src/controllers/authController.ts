import express from 'express';
import userService from 'src/services/userService';
import authUtil from 'src/utils/authUtil';
import { AUTH_BLOCK_TIME, AUTH_MAX_AGE_IN_SECOND } from 'src/utils/constants';

const signup = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const existingUser = await userService.getUserByEmail(email);

  if (existingUser !== null) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  try {
    await userService.registerUser({
      email: email,
      password: password,
    });
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const userBlockedAt = await userService.getUserBlockedAt(email);
  const now = new Date();
  const authBlockStartTime = new Date(now.getTime() - AUTH_BLOCK_TIME);

  // user is blocked
  if (userBlockedAt && userBlockedAt > authBlockStartTime) {
    return res.status(403).json({
      message: 'Too many failed attempts. Account temporarily locked.',
    });
  }

  const user = await userService.getUserByEmail(email);
  if (user === null) {
    return res.status(401).json({
      message: 'Invalid email or password.',
    });
  }

  if (!(await authUtil.verifyPassword(password, user.hashedPassword))) {
    await userService.handleFailedLogin(user);
    return res.status(401).json({
      message: 'Invalid email or password.',
    });
  }

  await userService.resetLoginTrial(user);
  const authToken = await authUtil.createAuthToken(user.id);

  res.cookie('jwt', authToken, {
    httpOnly: true,
    maxAge: AUTH_MAX_AGE_IN_SECOND * 1000,
  });

  return res.status(200).json({
    message: 'Login successful.',
  });
};

const logout = async (_req: express.Request, res: express.Response) => {
  res.cookie('jwt', '', {
    maxAge: 0,
  });

  return res.status(200).json({
    message: 'Logout successful.',
  });
};

export default {
  signup,
  login,
  logout,
};
