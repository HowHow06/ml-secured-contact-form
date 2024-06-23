import express from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'src/config/config';
import { SelectUser } from 'src/db/schemas';
import userService from 'src/services/userService';
import logger from 'src/utils/logger';

declare module 'express-serve-static-core' {
  interface Request {
    user?: SelectUser;
  }
}

const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log(req.cookies);
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'User not authenticated',
    });
  }

  try {
    const decodedToken = jwt.verify(token, config.tokenSecret) as JwtPayload;

    if (!decodedToken || !decodedToken.id) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'User not authenticated',
      });
    }

    const user = await userService.getUserByUuid(decodedToken.id);

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'User not authenticated',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'User not authenticated',
    });
  }
};

export default {
  authenticate,
};
