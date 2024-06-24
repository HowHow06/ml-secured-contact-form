import express from 'express';
import httpStatus, { HttpStatus } from 'http-status';
import config from 'src/config/config';
import ApiError from 'src/utils/apiError';
import logger from 'src/utils/logger';

const errorConverterMiddleware: express.ErrorRequestHandler = (
  err,
  _req,
  _res,
  next,
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = (error.statusCode ||
      httpStatus.BAD_REQUEST) as keyof HttpStatus;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode as number, message, false, err.stack);
  }
  next(error);
};

const errorHandlerMiddleware: express.ErrorRequestHandler = (
  err,
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next,
) => {
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

export { errorConverterMiddleware, errorHandlerMiddleware };
