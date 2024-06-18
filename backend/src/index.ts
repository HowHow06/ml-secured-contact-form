import express, { Express } from 'express';
import config from './config/config';
import morganMiddleware from './middlewares/httpLogger';

import http from 'http';

import helmet from 'helmet';
import httpStatus from 'http-status';
import errorHandlerMiddleware from './middlewares/errorHandler';
import router from './routes/v1';
import ApiError from './utils/apiError';
import logger from './utils/logger';

const app: Express = express();
const port = process.env.PORT || 3000;

// set security HTTP headers
app.use(helmet());

app.use(morganMiddleware);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

if (config.env === 'production') {
  // const corsOptions = {
  //   origin: 'https://myclientappdomain.com',
  //   optionsSuccessStatus: 200,
  // };
  // // enable cors
  // app.use(cors(corsOptions));
  // app.options('*', cors(corsOptions));
}

// v1 api routes
app.use('/v1', router);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorHandlerMiddleware);
app.set('port', port);

const server = http.createServer(app);

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
    case 'EADDRINUSE':
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.info(`Server is listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
