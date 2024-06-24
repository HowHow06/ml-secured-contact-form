import express from 'express';
import httpStatus from 'http-status';
import userService from 'src/services/userService';
import ApiError from 'src/utils/apiError';
import authUtil from 'src/utils/authUtil';
import catchAsync from 'src/utils/catchAsync';
import { AUTH_BLOCK_TIME, AUTH_MAX_AGE_IN_SECOND } from 'src/utils/constants';

const signup = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser !== null) {
      res
        .status(httpStatus.CONFLICT)
        .json({ message: 'Email already registered.' });
      return;
    }

    try {
      await userService.registerUser({
        email: email,
        password: password,
      });
      res
        .status(httpStatus.CREATED)
        .send({ message: 'User registered successfully' });
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to register user.');
    }
  },
);

const login = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const userBlockedAt = await userService.getUserBlockedAt(email);
    const now = new Date();
    const authBlockStartTime = new Date(now.getTime() - AUTH_BLOCK_TIME);

    // user is blocked
    if (userBlockedAt && userBlockedAt > authBlockStartTime) {
      res.status(httpStatus.FORBIDDEN).json({
        message: 'Too many failed attempts. Account temporarily locked.',
      });
      return;
    }

    const user = await userService.getUserByEmail(email);
    if (user === null) {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid email or password.',
      });
      return;
    }

    if (!(await authUtil.verifyPassword(password, user.hashedPassword))) {
      await userService.handleFailedLogin(user);
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid email or password.',
      });
      return;
    }

    await userService.resetLoginTrial(user);
    const authToken = await authUtil.createAuthToken(user.id);

    res.cookie('jwt', authToken, {
      httpOnly: true,
      maxAge: AUTH_MAX_AGE_IN_SECOND * 1000,
    });

    res.status(httpStatus.OK).json({
      message: 'Login successful.',
    });
  },
);

const logout = catchAsync(
  async (_req: express.Request, res: express.Response) => {
    res.cookie('jwt', '', {
      maxAge: 0,
    });

    res.status(httpStatus.OK).json({
      message: 'Logout successful.',
    });
  },
);

export default {
  signup,
  login,
  logout,
};
