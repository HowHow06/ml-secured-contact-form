import morgan, { StreamOptions } from 'morgan';
import logger from 'src/utils/logger';

const stream: StreamOptions = {
  write: message => logger.info(message),
};

// Build the morgan middleware
const morganMiddleware = morgan('combined', { stream: stream });

export default morganMiddleware;
