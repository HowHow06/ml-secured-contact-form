import express from 'express';
import config from '../config/config';
import logger from './logger';

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: HttpError, res: express.Response): void => {
  const { statusCode, message } = err;

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  });
};
