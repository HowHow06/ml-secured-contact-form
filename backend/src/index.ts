import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import httpStatus from 'http-status';
import config from './config/config';
import errorHandlerMiddleware from './middlewares/errorHandler';
import morganMiddleware from './middlewares/httpLogger';
import router from './routes/v1';
import ApiError from './utils/apiError';
import logger from './utils/logger';

const app: Express = express();
const port = config.port || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  headers: true,
});

app.use(limiter);

app.use(cookieParser());

// set security HTTP headers
app.use(helmet());

app.use(morganMiddleware);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

const corsOrigins = JSON.parse(config.backendCorsOrigins || '["*"]');

// Setup CORS with dynamic origins using TypeScript types
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      corsOrigins.indexOf('*') !== -1 ||
      corsOrigins.indexOf(origin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// enable cors
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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
