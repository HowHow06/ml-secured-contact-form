import express from 'express';
import logger from '../utils/logger';

const healthCheck = async (_req: express.Request, res: express.Response) => {
  logger.info('Server is starting');
  res.send('Express + TypeScript Server');
};

export default {
  healthCheck,
};
