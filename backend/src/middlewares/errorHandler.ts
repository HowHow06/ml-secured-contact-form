import express from 'express';
import { handleError } from 'src/utils/errorHandler';

// error handler
const errorHandlerMiddleware: express.ErrorRequestHandler = (
  err,
  _req,
  res,
) => {
  handleError(err, res);
};

export default errorHandlerMiddleware;
